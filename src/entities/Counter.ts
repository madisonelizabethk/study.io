import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  counterId: string;

  // Many to One Relationship with Quiz
  @ManyToOne(() => Quiz, (quiz) => quiz.scores, { cascade: ['insert', 'update'] })
  quiz: Relation<Quiz>[];

  // Many to One Relationship with User
  @ManyToOne(() => User, (user) => user.counters, { cascade: ['insert', 'update'] })
  user: Relation<User>;

  @Column()
  setName: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  wrongAnswerCounter: number;
}
