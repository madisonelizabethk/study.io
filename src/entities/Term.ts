import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  vocabTerm: string;

  @Column({ unique: true })
  vocabDefinition: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  WrongAnswerCounter: string;
}
