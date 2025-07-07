import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Child } from 'src/entities/child.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Injectable()
export class ChildService {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {}

  async getAllChildren(page: number, limit: number): Promise<any> {
    const [data, total] = await this.childRepository
      .createQueryBuilder('child')
      .where('child.deletedAt IS NULL')
      .orderBy('child.createdAt', 'DESC')
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

  async getChildById(childId: string): Promise<any> {
    const child = await this.childRepository
      .createQueryBuilder('child')
      .where('child.id = :childId', { childId })
      .andWhere('child.deletedAt IS NULL')
      .getOne();

    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found.`);
    }

    return child;
  }

  async createChild(dto: CreateChildDto): Promise<any> {
    const newChild = this.childRepository.create(dto); // creates a new child entity object
    const savedChild = await this.childRepository.save(newChild); // saves the child entity object to DB

    return {
      id: savedChild.id,
      name: savedChild.name,
      yob: savedChild.yob,
    };
  }

  async updateChild(childId: string, updateData: UpdateChildDto) {
    const child = await this.childRepository.preload({
      id: childId,
      ...updateData,
    });

    if (!child || child.deletedAt) {
      throw new NotFoundException(`Child with id ${childId} not found`);
    }

    return this.childRepository.save(child);
  }

  async softDeleteChild(childId: string): Promise<any> {
    const child = await this.childRepository.findOne({
      where: { id: childId, deletedAt: IsNull() },
    });

    if (!child) {
      throw new NotFoundException(`Child with id ${childId} not found or already deleted`);
    }

    child.deletedAt = new Date();
    await this.childRepository.save(child);

    const successMsg = `Child with id ${childId} has been soft deleted.`;
    return successMsg;
  }
}
