import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Person } from './person.entity';
import { Activity } from './activity.entity';

@Entity('responses')
export class Response extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  personId: string;

  @ManyToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({ type: 'uuid' })
  activityId: string;

  @ManyToOne(() => Activity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  domain: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attribute: string;

  @Column({ type: 'jsonb', nullable: true })
  responseData: any; // Stores the actual answer/response given by the person

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  previousScore: number; // Score before this response

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  newScore: number; // Score after this response

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  scoreChange: number; // Delta (newScore - previousScore)

  @Column({ type: 'integer', nullable: true })
  timeSpentSeconds: number; // Time spent on the activity in seconds

  @Column({ type: 'jsonb', nullable: true })
  metadata: any; // Any additional context or metadata about the response
}
