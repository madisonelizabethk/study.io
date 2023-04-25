import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Relation,
  JoinTable,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Assignment } from './Assignment';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  classID: string;

  // Many to Many Relationship with User
  @ManyToMany(() => User, (users) => users.info, { cascade: ['insert', 'update'] })
  @JoinTable()
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

  @OneToMany(() => Assignment, (assignment) => assignment.classInfo, {
    cascade: ['insert', 'update'],
  })
  assignments: Relation<Assignment>[];
}
