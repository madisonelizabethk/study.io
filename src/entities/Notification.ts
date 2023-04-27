import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation } from 'typeorm';
import { Assignment } from './Assignment';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  assignmentName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  dueDate: Date;

  @Column()
  class: string;

  @Column()
  sendNotificationOn: Date;

  // @ManyToOne(() )

  // @ManyToOne(() => User, (user) => user.notifications, { cascade: ['insert', 'update'] })
  // user: Relation<User>;

  @OneToOne(() => Assignment, (assignment) => assignment.notification, {
    cascade: ['insert', 'update'],
  })
  assignment: Relation<Assignment>;
}
