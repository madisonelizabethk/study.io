import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Relation,
  JoinTable,
  OneToMany,
  Column,
} from 'typeorm';

import { Term } from './Term';
import { Counter } from './Counter';
import { User } from './User';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  quizId: string;

  // Many to Many Relationship with User
  @ManyToMany(() => User, (users) => users.quizzes, { cascade: ['insert', 'update'] })
  users: Relation<User>[];

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Term, (term) => term.scores, { cascade: ['insert', 'update'] })
  @JoinTable()
  terms: Relation<Term>[];

  // One to Many Relationship with Counter
  @OneToMany(() => Counter, (counter) => counter.quizzes, { cascade: ['insert', 'update'] })
  scores: Relation<Counter>[];

  @Column()
  setName: string;
}
