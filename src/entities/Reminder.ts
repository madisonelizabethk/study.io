import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn('uuid')
  reminderId: string;

  @Column()
  sendNotificationOn: Date;

  @Column()
  items: Notification;

  @ManyToOne(() => User, (user) => user.reminders, { cascade: ['insert', 'update'] })
  user: Relation<User>;
}
