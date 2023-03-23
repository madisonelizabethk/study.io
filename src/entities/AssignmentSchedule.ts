import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';

@Entity()
export class AssignmentSchedule {
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

  @OneToMany(() => Notification, (notification) => notification.schedule, {
    cascade: ['insert', 'update'],
  })
  notifications: Relation<Notification>[];
}
