import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  counterId: string;

  // Many to One Relationship with Quiz
  @ManyToOne(() => Quiz, (quizzes) => quizzes.scores, { cascade: ['insert', 'update'] })
  quizzes: Relation<Quiz>[];

  // Many to One Relationship with User
  @ManyToOne(() => User, (users) => users.counters, { cascade: ['insert', 'update'] })
  users: Relation<User>;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  wrongAnswerCounter: number;
}
