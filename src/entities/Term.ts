import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Quiz } from './Quiz';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  termId: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Quiz, (quiz) => quiz.terms)
  @JoinTable()
  quizzes: Relation<Quiz>[];
}
