import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { AssignmentSchedule } from './AssignmentSchedule';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  assignmentName: string;

  @Column()
  dueTime: number;

  @Column()
  dueDate: string;

  @Column()
  class: string;
}
