import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quizId: string;

  @ManyToMany(() => Term, (term) => term.scores, { cascade: ['insert', 'update'] })
  @JoinTable()
  vocabterms: Relation<Term>[];
}
