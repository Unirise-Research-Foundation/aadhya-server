import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Response } from '../entities/response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { Intelligence } from '../entities/intelligence.entity';
import { Activity } from '../entities/activity.entity';
import * as fs from 'fs';
import * as path from 'path';

// Types for JSON-based activities
interface QuestionActivity {
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

interface ActivitiesData {
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
export class ResponsesService {
  private activitiesData: ActivitiesData;

  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
    @InjectRepository(Intelligence)
    private readonly intelligenceRepository: Repository<Intelligence>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
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
  }

  private getActivityById(questionId: number): QuestionActivity | undefined {
    return this.activitiesData.questions.find((q) => q.id === questionId);
  }

  async create(createResponseDto: CreateResponseDto): Promise<Response> {
    const response = this.responseRepository.create(createResponseDto);
    return await this.responseRepository.save(response);
  }

  async findAll(options?: {
    personId?: string;
    activityId?: string;
    limit?: number;
    offset?: number;
  }): Promise<Response[]> {
    const where: FindOptionsWhere<Response> = {};

    if (options?.personId) {
      where.personId = options.personId;
    }

    if (options?.activityId) {
      where.activityId = options.activityId;
    }

    return await this.responseRepository.find({
      where,
      relations: ['person', 'activity'],
      order: { createdAt: 'DESC' },
      take: options?.limit || 100,
      skip: options?.offset || 0,
    });
  }

  async findOne(id: string): Promise<Response | null> {
    return await this.responseRepository.findOne({
      where: { id },
      relations: ['person', 'activity'],
    });
  }

  async findByPerson(personId: string): Promise<Response[]> {
    return await this.responseRepository.find({
      where: { personId },
      relations: ['activity'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByActivity(activityId: string): Promise<Response[]> {
    return await this.responseRepository.find({
      where: { activityId },
      relations: ['person'],
      order: { createdAt: 'DESC' },
    });
  }

  async getPersonStats(personId: string): Promise<{
    totalResponses: number;
    totalScoreGained: number;
    averageTimeSpent: number;
  }> {
    const responses = await this.responseRepository.find({
      where: { personId },
    });

    const totalResponses = responses.length;
    const totalScoreGained = responses.reduce((sum, r) => sum + (r.scoreChange || 0), 0);
    const totalTimeSpent = responses.reduce((sum, r) => sum + (r.timeSpentSeconds || 0), 0);
    const averageTimeSpent = totalResponses > 0 ? totalTimeSpent / totalResponses : 0;

    return {
      totalResponses,
      totalScoreGained,
      averageTimeSpent,
    };
  }

  async submitAnswer(
    activityId: string,
    optionValue: number,
    personId: string,
  ): Promise<{ intelligences: Record<string, number> }> {
    // Find the activity in the database
    const activity = await this.activityRepository.findOne({
      where: { id: activityId },
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${activityId} not found`);
    }

    // Use attribute if available, otherwise fall back to domain
    const attribute = activity.attribute || activity.domain;

    // Get score adjustment from metadata options
    const options = (activity.metadata?.options || []) as Array<{ value: number; label: string; scoreAdjustment: number }>;
    const selectedOption = options.find((opt: any) => opt.value === optionValue);

    if (!selectedOption) {
      throw new BadRequestException(
        `Option with value ${optionValue} not found for activity ${activityId}`,
      );
    }

    const scoreAdjustment = selectedOption.scoreAdjustment;

    // Check if this activity was answered before by this person
    const existingResponse = await this.responseRepository.findOne({
      where: { personId, activityId },
      order: { createdAt: 'DESC' },
    });

    // Get or create intelligence record for the person
    let intelligence = await this.intelligenceRepository.findOne({
      where: { personId },
    });

    const baseScore = this.activitiesData.scoring.baseScore;

    // Initialize scores object
    const initialScores: Record<string, number> = {};
    this.activitiesData.metadata.intelligenceDomains.forEach((domain) => {
      initialScores[domain] = baseScore;
    });

    if (!intelligence) {
      // Create new intelligence record with initial scores
      intelligence = this.intelligenceRepository.create({
        personId,
        data: initialScores,
      });
    } else {
      // Initialize data if it doesn't exist or is null
      if (!intelligence.data) {
        intelligence.data = { ...initialScores };
      } else {
        // Ensure all domains exist, initialize missing ones
        const data = intelligence.data;
        this.activitiesData.metadata.intelligenceDomains.forEach((domain) => {
          if (data[domain] === undefined) {
            data[domain] = baseScore;
          }
        });
      }
    }

    // At this point, intelligence is guaranteed to be non-null and have data
    const intelligenceData = intelligence.data!;

    // Update the score for the specific intelligence attribute
    if (!intelligenceData[attribute]) {
      intelligenceData[attribute] = baseScore;
    }

    // Calculate the actual score adjustment to apply
    let actualScoreAdjustment = scoreAdjustment;

    if (existingResponse) {
      // Activity was answered before - calculate delta
      const oldScoreChange = existingResponse.scoreChange || 0;
      const scoreDelta = scoreAdjustment - oldScoreChange;
      actualScoreAdjustment = scoreDelta;

      // Capture current score before this update
      const previousScore = intelligenceData[attribute];

      // Update the existing response
      existingResponse.responseData = {
        optionValue,
        attribute,
      };
      existingResponse.previousScore = previousScore;
      existingResponse.newScore = previousScore + scoreDelta;
      existingResponse.scoreChange = scoreAdjustment; // Store the new absolute score change
      existingResponse.metadata = {
        ...existingResponse.metadata,
        activityType: activity.type,
        updated: true,
        oldScoreChange,
        scoreDelta,
      };

      await this.responseRepository.save(existingResponse);
    } else {
      // New response - capture previous score for audit log
      const previousScore = intelligenceData[attribute];

      // Step 1: Insert the new response data into the responses table
      await this.create({
        personId,
        activityId,
        domain: activity.domain,
        attribute: activity.attribute,
        responseData: {
          optionValue,
          attribute,
        },
        previousScore,
        newScore: previousScore + scoreAdjustment,
        scoreChange: scoreAdjustment,
        metadata: {
          activityType: activity.type,
        },
      });
    }

    // Step 2: Update the scores in the intelligences table
    intelligenceData[attribute] += actualScoreAdjustment;

    // Ensure score doesn't go below 0 or above 100 (optional bounds)
    intelligenceData[attribute] = Math.max(0, Math.min(100, intelligenceData[attribute]));

    // Save the updated intelligence record
    await this.intelligenceRepository.save(intelligence);

    return {
      intelligences: intelligenceData,
    };
  }
}
