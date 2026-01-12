import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intelligences } from '../entities/intelligences.entity';
import * as fs from 'fs';
import * as path from 'path';

export interface Question {
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

export interface QuestionsData {
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
  questions: Question[];
}

@Injectable()
export class QuestionsService {
  private questionsData: QuestionsData;
  private shuffledQuestions: Question[] = [];

  constructor(
    @InjectRepository(Intelligences)
    private readonly intelligencesRepository: Repository<Intelligences>,
  ) {
    this.loadQuestions();
  }

  private loadQuestions(): void {
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
    this.questionsData = JSON.parse(fileContent);
    this.shuffleQuestions();
  }

  private shuffleQuestions(): void {
    // Fisher-Yates shuffle algorithm
    this.shuffledQuestions = [...this.questionsData.questions];
    for (let i = this.shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledQuestions[i], this.shuffledQuestions[j]] = [
        this.shuffledQuestions[j],
        this.shuffledQuestions[i],
      ];
    }
  }

  getQuestions(page: number = 1, limit: number = 5): {
    questions: Question[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
  } {
    const total = this.questionsData.questions.length;
    
    // Create a copy of all questions and shuffle them each time
    const shuffled = [...this.questionsData.questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return only the requested number of random questions
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

  getMetadata(): QuestionsData['metadata'] {
    return this.questionsData.metadata;
  }

  getScoring(): QuestionsData['scoring'] {
    return this.questionsData.scoring;
  }

  getAnswerOptions(): QuestionsData['answerOptions'] {
    return this.questionsData.answerOptions;
  }

  getAllQuestionsData(): QuestionsData {
    return this.questionsData;
  }

  getQuestionById(questionId: number): Question | undefined {
    return this.questionsData.questions.find((q) => q.id === questionId);
  }

  async submitAnswer(
    questionId: number,
    optionValue: number,
    personId: string,
  ): Promise<{ intelligences: Record<string, number> }> {
    // Find the question
    const question = this.getQuestionById(questionId);
    if (!question) {
      throw new NotFoundException(`Question with ID ${questionId} not found`);
    }

    // Find the selected option
    const selectedOption = question.options.find((opt) => opt.value === optionValue);
    if (!selectedOption) {
      throw new BadRequestException(
        `Option with value ${optionValue} not found for question ${questionId}`,
      );
    }

    // Get or create intelligences record for the person
    let intelligences = await this.intelligencesRepository.findOne({
      where: { personId },
    });

    const baseScore = this.questionsData.scoring.baseScore;
    const scoreAdjustment = selectedOption.scoreAdjustment;
    const intelligenceDomain = question.intelligenceDomain;

    // Initialize scores object
    const initialScores: Record<string, number> = {};
    this.questionsData.metadata.intelligenceDomains.forEach((domain) => {
      initialScores[domain] = baseScore;
    });

    if (!intelligences) {
      // Create new intelligences record with initial scores
      intelligences = this.intelligencesRepository.create({
        personId,
        data: initialScores,
      });
    } else {
      // Initialize data if it doesn't exist or is null
      if (!intelligences.data) {
        intelligences.data = { ...initialScores };
      } else {
        // Ensure all domains exist, initialize missing ones
        const data = intelligences.data;
        this.questionsData.metadata.intelligenceDomains.forEach((domain) => {
          if (data[domain] === undefined) {
            data[domain] = baseScore;
          }
        });
      }
    }

    // At this point, intelligences is guaranteed to be non-null and have data
    const intelligencesData = intelligences.data!;

    // Update the score for the specific intelligence domain
    if (!intelligencesData[intelligenceDomain]) {
      intelligencesData[intelligenceDomain] = baseScore;
    }

    intelligencesData[intelligenceDomain] += scoreAdjustment;

    // Ensure score doesn't go below 0 or above 100 (optional bounds)
    intelligencesData[intelligenceDomain] = Math.max(
      0,
      Math.min(100, intelligencesData[intelligenceDomain]),
    );

    // Save the updated intelligences record
    await this.intelligencesRepository.save(intelligences);

    return {
      intelligences: intelligencesData,
    };
  }

  async getIntelligences(personId: string): Promise<{ intelligences: Record<string, number> }> {
    const intelligences = await this.intelligencesRepository.findOne({
      where: { personId },
    });

    if (!intelligences || !intelligences.data) {
      // Return base scores if no intelligences record exists
      const baseScore = this.questionsData.scoring.baseScore;
      const initialScores: Record<string, number> = {};
      this.questionsData.metadata.intelligenceDomains.forEach((domain) => {
        initialScores[domain] = baseScore;
      });
      return {
        intelligences: initialScores,
      };
    }

    return {
      intelligences: intelligences.data,
    };
  }
}

