import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { Person } from './person.entity';

@Entity()
export class Relationships extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  personId: string;

  @ManyToOne(() => Person, (person) => person.relationships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column({ type: 'uuid', nullable: true })
  relatedPersonId?: string;

  @ManyToOne(() => Person, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'relatedPersonId' })
  relatedPerson?: Person;

  @Column({ type: 'varchar', length: 100, nullable: true })
  relationType?: string;

  @Column({ type: 'jsonb', nullable: true })
  data: any;
}
