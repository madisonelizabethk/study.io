import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ClassInfo {
  @Column({ unique: true })
  className: string;

  @Column({ unique: true })
  studentID: string;

  @Column({ unique: true })
  passwordHash: string;

  @Column({ unique: true })
  classTimes: number;

  @Column({ default: 0 })
  classTextbook: string;

  @Column({ default: 0 })
  gradingScale: number;

  @Column({ unique: true })
  courseDescription: string;

  @Column({ default: false })
  professorEmail: string;

  @Column({ default: 0 })
  officeHours: string;
}
