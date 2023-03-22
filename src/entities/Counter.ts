import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  counterId: string;

  @OneToMany(() => Quiz, (quiz) => quiz.scores, { cascade: ['insert', 'update'] })
  quiz: Relation<Quiz>[];

  @Column()
  setName: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  wrongAnswerCounter: number;
}
