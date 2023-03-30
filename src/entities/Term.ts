import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation, JoinTable } from 'typeorm';
import { Quiz } from './Quiz';
import { User } from './User';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  termId: string;

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Quiz, (quiz) => quiz.term, { cascade: ['insert', 'update'] })
  @JoinTable()
  scores: Relation<Quiz>[];

  // Many to Many Relationship with User
  @ManyToMany(() => User, (user) => user.term, { cascade: ['insert', 'update'] })
  user: Relation<User>[];

  @Column()
  vocabDefinition: string;
}
