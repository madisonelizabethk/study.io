import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Relation,
} from 'typeorm';
import { ClassInfo } from './ClassInfo';
import { Notification } from './Notification';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  assignmentId: string;

  @Column()
  assignmentName: string;

  @Column()
  assignmentType: string;

  @Column()
  dueDate: Date;

  // Relations
  @OneToOne(() => Notification, (notification) => notification.assignment)
  @JoinColumn()
  notification: Relation<Notification>;

  @ManyToOne(() => ClassInfo, (classInfo) => classInfo.assignments)
  classInfo: Relation<ClassInfo>;
}
