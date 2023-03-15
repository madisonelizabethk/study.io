import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Counter {
  @PrimaryGeneratedColumn('uuid')
  setName: string;

  @Column({ default: 0 })
  rightAnswerCounter: number;

  @Column({ default: 0 })
  WrongAnswerCounter: number;
}
