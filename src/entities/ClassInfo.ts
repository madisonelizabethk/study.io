import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  classID: string;

  // Many to Many Relationship with User
  @ManyToMany(() => User, (users) => users.info, { cascade: ['insert', 'update'] })
  users: Relation<User>[];

  @Column()
  className: string;

  @Column()
  classTimes: number;

  @Column()
  classTextbook: string;

  @Column()
  courseDescription: string;

  @Column({ nullable: true })
  professorEmail: string;

  @Column({ nullable: true })
  officeHours: string;
}
