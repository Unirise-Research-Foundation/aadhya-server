import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from '../entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    const assessment = this.assessmentRepository.create(createAssessmentDto);
    return await this.assessmentRepository.save(assessment);
  }

  async findAll(): Promise<Assessment[]> {
    return await this.assessmentRepository.find({
      relations: ['activities'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Assessment> {
    const assessment = await this.assessmentRepository.findOne({
      where: { id },
      relations: ['activities'],
    });

    if (!assessment) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }

    return assessment;
  }

  async update(id: string, updateAssessmentDto: UpdateAssessmentDto): Promise<Assessment> {
    const assessment = await this.findOne(id);
    Object.assign(assessment, updateAssessmentDto);
    return await this.assessmentRepository.save(assessment);
  }

  async remove(id: string): Promise<void> {
    const assessment = await this.findOne(id);
    await this.assessmentRepository.softRemove(assessment);
  }
}

