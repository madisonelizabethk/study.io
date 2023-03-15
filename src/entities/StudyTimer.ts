import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StudyTimer {
  @PrimaryGeneratedColumn('uuid')
  classID: string;

  @Column({ default: 0 })
  startTime: number;

  @Column({ default: 0 })
  shortBreakTime: number;

  @Column({ default: 0 })
  longBreakTime: number;

  @Column({ default: 0 })
  endTime: number;

  @Column({ default: true })
  taskCompletion: Array<Task>;
}
