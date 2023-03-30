import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Relation } from 'typeorm';
import { User } from './User';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  classID: string;

  // Many to Many Relationship with User
  @ManyToMany(() => User, (user) => user.info, { cascade: ['insert', 'update'] })
  user: Relation<User>[];

  @Column()
  className: string;

  @Column()
  classTimes: number;

  @Column()
  classTextbook: string;

  @Column()
  courseDescription: string;

  @Column() // make null
  professorEmail: string;

  @Column() // make null
  officeHours: string;
}
