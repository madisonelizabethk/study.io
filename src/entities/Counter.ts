import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Relation } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  counterId: string;

  @OneToMany(() => Quiz, (quiz) => quiz.scores, { cascade: ['insert', 'update'] })
  quiz: Relation<Quiz>[];

  @ManyToOne(() => User, (user) => user.counters, { cascade: ['insert', 'update'] })
  user: Relation<User>;

  @Column()
  setName: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  wrongAnswerCounter: number;
}
