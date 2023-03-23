import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
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

  @OneToMany(() => AssignmentSchedule, (assignment) => assignment.schedule, {
    cascade: ['insert', 'update'],
  })
  assignments: Relation<Notification>[];
}
