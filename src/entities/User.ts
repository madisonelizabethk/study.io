import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation, ManyToMany } from 'typeorm';
import { Counter } from './Counter';
import { Quiz } from './Quiz';
import { ClassInfo } from './ClassInfo';
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
  quizzes: Relation<Quiz>[];

  // One to Many Relationship with Counter
  @OneToMany(() => Counter, (counter) => counter.users, { cascade: ['insert', 'update'] })
  counters: Relation<Counter>[];

<<<<<<< HEAD
  // Many to Many Relationship with Term
  @ManyToMany(() => Term, (terms) => terms.users, { cascade: ['insert', 'update'] })
  @JoinTable()
  terms: Relation<Term>[];

  // One to Many Relationship with Reminder
  @OneToMany(() => Reminder, (reminder) => reminder.user, { cascade: ['insert', 'update'] })
  reminders: Relation<Reminder>[];

=======
>>>>>>> fe6b90c (quiz stuff, term and user)
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
}
