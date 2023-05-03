import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Counter } from './Counter';
import { Quiz } from './Quiz';
import { ClassInfo } from './ClassInfo';
import { Notification } from './Notification';
import { Reminder } from './Reminder';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  // Many to Many Relationship with ClassInfo
  @ManyToMany(() => ClassInfo, (info) => info.users, { cascade: ['insert', 'update'] })
  info: Relation<ClassInfo>[];

  // Many to Many Relationship with Quiz
  @ManyToMany(() => Quiz, (quizzes) => quizzes.users, { cascade: ['insert', 'update'] })
  @JoinTable()
  quizzes: Relation<Quiz>[];

  // One to Many Relationship with Counter
  @OneToMany(() => Counter, (counter) => counter.users, { cascade: ['insert', 'update'] })
  counters: Relation<Counter>[];

  // One to Many Relationship with Notification
  @OneToMany(() => Notification, (notification) => notification.username, {
    cascade: ['insert', 'update'],
  })
  notifications: Relation<Notification>[];

  @Column() // No relationship
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  classification: string;

  @Column({ unique: true })
  passwordHash: string;

  @OneToMany(() => Reminder, (reminder) => reminder.username, {
    cascade: ['insert', 'update'],
  })
}
