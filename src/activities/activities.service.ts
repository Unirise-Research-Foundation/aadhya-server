import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intelligence } from '../entities/intelligence.entity';
import { Activity } from '../entities/activity.entity';
import { Assessment } from '../entities/assessment.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import * as fs from 'fs';
import * as path from 'path';

export interface QuestionActivity {
  id: number;
  text: string;
  intelligenceDomain: string;
  domainDisplayName: string;
  options: Array<{
    value: number;
    label: string;
    emoji: string;
    scoreAdjustment: number;
  }>;
}

export interface ActivitiesData {
  metadata: {
    title: string;
    description: string;
    version: string;
    totalQuestions: number;
    intelligenceDomains: string[];
  };
  scoring: {
    baseScore: number;
    scoreAdjustments: Record<string, number>;
    description: string;
  };
  answerOptions: Array<{
    value: number;
    label: string;
    emoji: string;
  }>;
  questions: QuestionActivity[];
}

@Injectable()
export class ActivitiesService {
  private activitiesData: ActivitiesData;
  private shuffledActivities: QuestionActivity[] = [];

  constructor(
    @InjectRepository(Intelligence)
    private readonly intelligenceRepository: Repository<Intelligence>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
  ) {
    this.loadActivities();
  }

  private loadActivities(): void {
    // Try multiple paths to support both development and production builds
    const possiblePaths = [
      path.join(__dirname, '../data/multiple-intelligences-questions.json'), // Production (dist)
      path.join(process.cwd(), 'src/data/multiple-intelligences-questions.json'), // Development
      path.join(process.cwd(), 'dist/data/multiple-intelligences-questions.json'), // Production alternative
    ];

    let filePath: string | null = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        filePath = possiblePath;
        break;
      }
    }

    if (!filePath) {
      throw new Error('Could not find multiple-intelligences-questions.json file');
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    this.activitiesData = JSON.parse(fileContent);
    this.shuffleActivities();
  }

  private shuffleActivities(): void {
    // Fisher-Yates shuffle algorithm
    this.shuffledActivities = [...this.activitiesData.questions];
    for (let i = this.shuffledActivities.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledActivities[i], this.shuffledActivities[j]] = [
        this.shuffledActivities[j],
        this.shuffledActivities[i],
      ];
    }
  }

  getActivities(page: number = 1, limit: number = 5, assessmentId?: string): {
    questions: QuestionActivity[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  } {
    // Note: assessmentId filtering is not implemented for JSON-based activities
    // This would require either:
    // 1. Adding assessment metadata to the JSON file
    // 2. Using entity-based activities from the database (via /activities/entity endpoint)
    // For now, assessmentId is accepted but ignored for compatibility
    
    const total = this.activitiesData.questions.length;
    
    // Create a copy of all activities and shuffle them each time
    const shuffled = [...this.activitiesData.questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return only the requested number of random activities
    const questions = shuffled.slice(0, limit);
    const totalPages = Math.ceil(total / limit);

    return {
      questions,
      pagination: {
        page: 1, // Always return page 1 since we're not paginating
        limit,
        total,
        totalPages,
        hasNext: false, // No pagination, so no next page
        hasPrevious: false, // No pagination, so no previous page
      },
    };
  }

  getAllActivitiesData(): ActivitiesData {
    return this.activitiesData;
  }

  getActivityById(questionId: number): QuestionActivity | undefined {
    return this.activitiesData.questions.find((q) => q.id === questionId);
  }

  private mergeMetadataFields(dto: CreateActivityDto | UpdateActivityDto): Record<string, unknown> {
    const presentationKeys = [
      'key', 'label', 'icon', 'title', 'subtitle',
      'snippet', 'description', 'paragraph1', 'paragraph2', 'media',
    ] as const;

    const merged: Record<string, unknown> = { ...(dto.metadata || {}) };

    for (const field of presentationKeys) {
      if ((dto as any)[field] !== undefined) {
        merged[field] = (dto as any)[field];
      }
    }

    return merged;
  }

  private stripPresentationFields(dto: CreateActivityDto | UpdateActivityDto): Omit<typeof dto, 'key' | 'label' | 'icon' | 'title' | 'subtitle' | 'snippet' | 'description' | 'paragraph1' | 'paragraph2' | 'media'> {
    const { key, label, icon, title, subtitle, snippet, description, paragraph1, paragraph2, media, ...rest } = dto as any;
    return rest;
  }

  // CRUD operations for entity-based activities
  async createActivity(createActivityDto: CreateActivityDto): Promise<Activity> {
    const assessment = await this.assessmentRepository.findOne({
      where: { id: createActivityDto.assessmentId },
    });

    if (!assessment) {
      throw new NotFoundException(
        `Assessment with ID ${createActivityDto.assessmentId} not found`,
      );
    }

    const metadata = this.mergeMetadataFields(createActivityDto);
    const entityData = this.stripPresentationFields(createActivityDto);

    const activity = this.activityRepository.create({ ...entityData, metadata });
    return await this.activityRepository.save(activity);
  }

  async findAllActivities(): Promise<Activity[]> {
    return await this.activityRepository.find({
      relations: ['assessment'],
      order: { createdAt: 'DESC' },
    });
  }

  async findActivitiesByAssessment(assessmentId: string): Promise<Activity[]> {
    return await this.activityRepository.find({
      where: { assessmentId },
      relations: ['assessment'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOneActivity(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['assessment'],
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }

    return activity;
  }

  async updateActivity(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOneActivity(id);

    if (updateActivityDto.assessmentId && updateActivityDto.assessmentId !== activity.assessmentId) {
      const assessment = await this.assessmentRepository.findOne({
        where: { id: updateActivityDto.assessmentId },
      });

      if (!assessment) {
        throw new NotFoundException(
          `Assessment with ID ${updateActivityDto.assessmentId} not found`,
        );
      }
    }

    const metadata = this.mergeMetadataFields({
      ...updateActivityDto,
      metadata: { ...(activity.metadata || {}), ...(updateActivityDto.metadata || {}) },
    });
    const entityData = this.stripPresentationFields(updateActivityDto);

    Object.assign(activity, entityData, { metadata });
    return await this.activityRepository.save(activity);
  }

  async removeActivity(id: string): Promise<void> {
    const activity = await this.findOneActivity(id);
    await this.activityRepository.softRemove(activity);
  }

  async getIntelligences(personId: string): Promise<{ intelligences: Record<string, number> }> {
    const intelligence = await this.intelligenceRepository.findOne({
      where: { personId },
    });

    if (!intelligence || !intelligence.data) {
      // Return base scores if no intelligence record exists
      const baseScore = this.activitiesData.scoring.baseScore;
      const initialScores: Record<string, number> = {};
      this.activitiesData.metadata.intelligenceDomains.forEach((domain) => {
        initialScores[domain] = baseScore;
      });
      return {
        intelligences: initialScores,
      };
    }

    return {
      intelligences: intelligence.data,
    };
  }
}

