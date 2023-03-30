import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { Notification } from './Notification';

@Entity()
export class AssignmentSchedule {
  @PrimaryGeneratedColumn('uuid')
  assignmentId: string;

  @Column()
  assignmentName: string;

  @Column()
  assignmentType: string;

  @Column()
  className: string;

  @Column()
  dueDate: Date;

  // One assignment schedule to many notifications
  @OneToMany(() => Notification, (notification) => notification.assignments, {
    cascade: ['insert', 'update'],
  })
  notifications: Relation<Notification>[];
}
