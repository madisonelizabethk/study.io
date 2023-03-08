import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class StudentInfo {
  @PrimaryGeneratedColumn('uuid')
  userID: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  studentID: number;

  @Column({ unique: true })
  firstName: string;

  @Column({ default: 0 })
  lastName: string;

  @Column({ unique: true })
  userEmail: string;

  @Column({ unique: true })
  classification: string;
}
