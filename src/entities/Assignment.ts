import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, Relation } from 'typeorm';
import { ClassInfo } from './ClassInfo';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  assignmentId: string;

  @Column()
  assignmentName: string;

  @Column()
  assignmentType: string;

  @Column()
  className: string;

  @Column()
  dueDate: Date;

  @Column()
  dueTime: Date;

  // Relations
  @OneToOne(() => Notification, (notification) => notification.assignment, {
    cascade: ['insert', 'update'],
  })
  notification: Relation<Notification>;

  @ManyToOne(() => ClassInfo, (classInfo) => classInfo.assignments, {
    cascade: ['insert', 'update'],
  })
  classInfo: Relation<ClassInfo>;
}
