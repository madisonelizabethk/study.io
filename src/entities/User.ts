import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @PrimaryGeneratedColumn('uuid')
  studentID: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  firstName: string;

  @Column({ default: 0 })
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
