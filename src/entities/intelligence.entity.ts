import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Person } from './person.entity';

@Entity('intelligence')
export class Intelligence extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  personId: string;

  @OneToOne(() => Person, (person) => person.intelligence, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({ type: 'jsonb', nullable: true })
  data: any;
}
