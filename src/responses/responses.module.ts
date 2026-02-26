import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { Response } from '../entities/response.entity';
import { Intelligence } from '../entities/intelligence.entity';
import { Physical } from '../entities/physical.entity';
import { Activity } from '../entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, Intelligence, Physical, Activity])],
  controllers: [ResponsesController],
  providers: [ResponsesService],
  exports: [ResponsesService],
})
export class ResponsesModule {}

