import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StudyTimer {
  @PrimaryGeneratedColumn('uuid')
  timerID: string;

  @Column({ default: 0 })
  startTime: number;

  @Column({ default: 0 })
  shortBreakTime: number;

  @Column({ default: 0 })
  longBreakTime: number;

  @Column({ default: 0 })
  endTime: number;
}
