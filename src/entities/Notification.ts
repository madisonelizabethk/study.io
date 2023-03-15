import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  assignmentName: string;

  @Column({ unique: true })
  dueTime: number;

  @Column({ unique: true })
  dueDate: string;

  @Column({ unique: true })
  class: string;

  @Column({ unique: true })
  assignmentType: number;
}
