import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  termId: string;

  @Column()
  question: string;

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Quiz, (quiz) => quiz.terms, { cascade: ['insert', 'update'] })
  @JoinTable()
  scores: Relation<Quiz>[];

  // Many to Many Relationship with User
  @ManyToMany(() => User, (users) => users.terms, { cascade: ['insert', 'update'] })
  users: Relation<User>[];

  @Column()
  answer: string;
}
