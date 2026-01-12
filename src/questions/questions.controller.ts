import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Version,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './questions.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller({
  path: 'questions',
  version: '1',
})
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  @Version('1')
  async getQuestions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    // Ignore page parameter, only use limit for random questions
    return this.questionsService.getQuestions(1, limit);
  }

  @Get('metadata')
  @Version('1')
  async getMetadata() {
    return this.questionsService.getMetadata();
  }

  @Get('scoring')
  @Version('1')
  async getScoring() {
    return this.questionsService.getScoring();
  }

  @Get('answer-options')
  @Version('1')
  async getAnswerOptions() {
    return this.questionsService.getAnswerOptions();
  }

  @Post('submit-answer')
  @Version('1')
  async submitAnswer(@Body() submitAnswerDto: SubmitAnswerDto) {
    return this.questionsService.submitAnswer(
      submitAnswerDto.questionId,
      submitAnswerDto.optionValue,
      submitAnswerDto.personId,
    );
  }

  @Get('intelligences/:personId')
  @Version('1')
  async getIntelligences(@Param('personId', new ParseUUIDPipe()) personId: string) {
    return this.questionsService.getIntelligences(personId);
  }
}

