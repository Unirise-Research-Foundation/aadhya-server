import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Intelligences } from '../entities/intelligences.entity';
import { Personality } from '../entities/personality.entity';
import { Physical } from '../entities/physical.entity';
import { Financial } from '../entities/financial.entity';
import { Relationships } from '../entities/relationships.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Intelligences, Personality, Physical, Financial, Relationships]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
