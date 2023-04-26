import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Relation, JoinColumn } from 'typeorm';
import { Assignment } from './Assignment';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  assignmentName: string;

  @Column()
  dueDate: Date;

  @Column()
  class: string;

  // @ManyToOne(() )

  // @ManyToOne(() => User, (user) => user.reminders, { cascade: ['insert', 'update'] })
  // user: Relation<User>;

  @OneToOne(() => Assignment, (assignment) => assignment.notification, {
    cascade: ['insert', 'update'],
  })
  assignment: Relation<Assignment>;
}
