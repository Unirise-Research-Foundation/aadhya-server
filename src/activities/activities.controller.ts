import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Patch,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Version,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller({
  path: 'activities',
  version: '1',
})
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  @Version('1')
  async getActivities(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('assessmentId') assessmentId?: string,
  ) {
    // Ignore page parameter, only use limit for random activities
    // If assessmentId is provided, filter by assessment (future enhancement)
    return this.activitiesService.getActivities(1, limit, assessmentId);
  }


  @Get('intelligences/:personId')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async getIntelligences(@Param('personId', new ParseUUIDPipe()) personId: string) {
    return this.activitiesService.getIntelligences(personId);
  }

  @Get('intelligences')
  @Version('1')
  @UseGuards(JwtAuthGuard)
  async getMyIntelligences(@CurrentUser() user: any) {
    return this.activitiesService.getIntelligences(user.id);
  }

  // Entity-based activity CRUD operations
  @Post('entity')
  @Version('1')
  async createActivity(@Body() createActivityDto: CreateActivityDto) {
    return await this.activitiesService.createActivity(createActivityDto);
  }

  @Get('entity')
  @Version('1')
  async findAllActivities(@Query('assessmentId') assessmentId?: string) {
    if (assessmentId) {
      return await this.activitiesService.findActivitiesByAssessment(assessmentId);
    }
    return await this.activitiesService.findAllActivities();
  }

  @Get('entity/:id')
  @Version('1')
  async findOneActivity(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.activitiesService.findOneActivity(id);
  }

  @Patch('entity/:id')
  @Version('1')
  async updateActivity(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activitiesService.updateActivity(id, updateActivityDto);
  }

  @Delete('entity/:id')
  @Version('1')
  async removeActivity(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.activitiesService.removeActivity(id);
    return { message: 'Activity deleted successfully' };
  }
}
