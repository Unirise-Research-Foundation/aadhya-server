import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Intelligence } from '../entities/intelligence.entity';
import { Physical } from '../entities/physical.entity';
import { Activity } from '../entities/activity.entity';
import { Assessment } from '../entities/assessment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intelligence, Physical, Activity, Assessment]),
  ],
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  exports: [ActivitiesService],
})
export class ActivitiesModule {}

