import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation } from 'typeorm';
import { Assignment } from './Assignment';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  sendNotificationOn: Date;

  @OneToOne(() => Assignment, (assignment) => assignment.notification, {
    cascade: ['insert', 'update'],
  })
  assignment: Relation<Assignment>;
}
