import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { SubmitAnswerDto } from '../activities/dto/submit-answer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller({
  path: 'responses',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class ResponsesController {
  constructor(private readonly responsesService: ResponsesService) {}

  @Post()
  @Version('1')
  async create(@Body() createResponseDto: CreateResponseDto) {
    return await this.responsesService.create(createResponseDto);
  }

  @Post('submit-answer')
  @Version('1')
  async submitAnswer(
    @Body() submitAnswerDto: SubmitAnswerDto,
    @CurrentUser() user: any,
  ) {
    return await this.responsesService.submitAnswer(
      submitAnswerDto.activityId,
      submitAnswerDto.optionValue,
      user.id,
      submitAnswerDto.timeSpentSeconds,
    );
  }

  @Get()
  @Version('1')
  async findAll(
    @Query('personId') personId?: string,
    @Query('activityId') activityId?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    return await this.responsesService.findAll({
      personId,
      activityId,
      limit,
      offset,
    });
  }

  @Get('my-responses')
  @Version('1')
  async getMyResponses(@CurrentUser() user: any) {
    return await this.responsesService.findByPerson(user.sub);
  }

  @Get('my-stats')
  @Version('1')
  async getMyStats(@CurrentUser() user: any) {
    return await this.responsesService.getPersonStats(user.sub);
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.responsesService.findOne(id);
  }

  @Get('person/:personId')
  @Version('1')
  async findByPerson(@Param('personId', ParseUUIDPipe) personId: string) {
    return await this.responsesService.findByPerson(personId);
  }

  @Get('activity/:activityId')
  @Version('1')
  async findByActivity(@Param('activityId', ParseUUIDPipe) activityId: string) {
    return await this.responsesService.findByActivity(activityId);
  }

  @Get('person/:personId/stats')
  @Version('1')
  async getPersonStats(@Param('personId', ParseUUIDPipe) personId: string) {
    return await this.responsesService.getPersonStats(personId);
  }
}

