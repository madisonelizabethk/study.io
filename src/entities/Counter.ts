import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  counterId: string;

  @Column()
  setName: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  wrongAnswerCounter: number;
}
