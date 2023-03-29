import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Relation,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quizId: string;

  @ManyToMany(() => Term, (term) => term.scores, { cascade: ['insert', 'update'] })
  @JoinTable()
  vocabterms: Relation<Term>[];

  @OneToMany(() => Counter, (counter) => counter.quiz, { cascade: ['insert', 'update'] })
  scores: Relation<Counter>[];
}
