import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Assessment } from './assessment.entity';

@Entity('activities')
export class Activity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  assessmentId: string;

  @ManyToOne(() => Assessment, (assessment) => assessment.activities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;

  @Column()
  type: string;

  @Column()
  domain: string;

  @Column({ nullable: true })
  attribute: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: any;
}

