import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @OneToMany(() => Counter, (counter) => counter.quiz, { cascade: ['insert', 'update'] })
  counter: Relation<Counter>[];

  @PrimaryGeneratedColumn('uuid')
  studentID: string;

  @Column({ unique: true }) // No relationship
  username: string;

  @Column({ unique: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  classification: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ default: false })
  verifiedEmail: boolean;

  @Column({ default: 0 })
  profileViews: number;
}
