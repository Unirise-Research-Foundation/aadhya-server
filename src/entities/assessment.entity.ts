import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Activity } from './activity.entity';

@Entity('assessments')
export class Assessment extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  introduction: string;

  @Column({ type: 'text' })
  conclusion: string;

  @OneToMany(() => Activity, (activity) => activity.assessment)
  activities?: Activity[];
}
