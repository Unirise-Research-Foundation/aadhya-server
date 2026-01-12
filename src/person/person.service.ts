import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { IsNull, Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async getAllPersons(page: number, limit: number): Promise<any> {
    const [data, total] = await this.personRepository
      .createQueryBuilder('person')
      .where('person.deletedAt IS NULL')
      .orderBy('person.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPersonById(personId: string): Promise<any> {
    const person = await this.personRepository
      .createQueryBuilder('person')
      .where('person.id = :personId', { personId })
      .andWhere('person.deletedAt IS NULL')
      .getOne();

    if (!person) {
      throw new NotFoundException(`Person with ID ${personId} not found.`);
    }

    return person;
  }

  async createPerson(dto: CreatePersonDto): Promise<any> {
    const newPerson = this.personRepository.create(dto); // creates a new person entity object
    const savedPerson = await this.personRepository.save(newPerson); // saves the person entity object to DB

    return {
      id: savedPerson.id,
      name: savedPerson.name,
      yob: savedPerson.yob,
    };
  }

  async updatePerson(personId: string, updateData: UpdatePersonDto) {
    const person = await this.personRepository.preload({
      id: personId,
      ...updateData,
    });

    if (!person || person.deletedAt) {
      throw new NotFoundException(`Person with id ${personId} not found`);
    }

    return this.personRepository.save(person);
  }

  async softDeletePerson(personId: string): Promise<any> {
    const person = await this.personRepository.findOne({
      where: { id: personId, deletedAt: IsNull() },
    });

    if (!person) {
      throw new NotFoundException(`Person with id ${personId} not found or already deleted`);
    }

    person.deletedAt = new Date();
    await this.personRepository.save(person);

    const successMsg = `Person with id ${personId} has been soft deleted.`;
    return successMsg;
  }
}
