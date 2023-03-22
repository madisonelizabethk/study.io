import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Quiz } from './Quiz';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  termId: string;

  @ManyToMany(() => Quiz, (quiz) => quiz.vocabTerms, { cascade: ['insert', 'update'] })
  @JoinTable()
  vocabTerms: Relation<Term>[];

  @Column({ unique: true })
  vocabDefinition: string;
}
