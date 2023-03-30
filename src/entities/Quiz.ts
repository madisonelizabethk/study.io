import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Relation,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Term } from './Term';
import { Counter } from './Counter';
import { User } from './User';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quizId: string;

  // Many to Many Relationship with User
  @ManyToMany(() => User, (user) => user.quiz, { cascade: ['insert', 'update'] })
  user: Relation<User>[];

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Term, (term) => term.scores, { cascade: ['insert', 'update'] })
  @JoinTable()
  term: Relation<Term>[];

  // One to Many Relationship with Counter
  @OneToMany(() => Counter, (counter) => counter.quiz, { cascade: ['insert', 'update'] })
  scores: Relation<Counter>[];
}
