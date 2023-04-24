import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  assignmentName: string;

  @Column()
  dueDate: Date;

  @Column()
  class: string;
}
