import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { CommonEntity } from '../entities/common.entity';
import { Intelligence } from './intelligence.entity';
import { Personality } from './personality.entity';
import { Physical } from './physical.entity';
import { Financial } from './financial.entity';
import { Relationships } from './relationships.entity';

@Entity()
export class Person extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  yob: number; // year of birth

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // hashed password

  @Column()
  role: string;

  @OneToOne(() => Intelligence, (intelligence) => intelligence.person)
  intelligence?: Intelligence;

  @OneToOne(() => Personality, (personality) => personality.person)
  personality?: Personality;

  @OneToOne(() => Physical, (physical) => physical.person)
  physical?: Physical;

  @OneToOne(() => Financial, (financial) => financial.person)
  financial?: Financial;

  @OneToMany(() => Relationships, (relationships) => relationships.person)
  relationships?: Relationships[];
}
