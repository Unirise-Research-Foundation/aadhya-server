import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../entities/person.entity';
import { Intelligence } from '../entities/intelligence.entity';
import { Personality } from '../entities/personality.entity';
import { Physical } from '../entities/physical.entity';
import { Financial } from '../entities/financial.entity';
import { Relationships } from '../entities/relationships.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Intelligence, Personality, Physical, Financial, Relationships]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
