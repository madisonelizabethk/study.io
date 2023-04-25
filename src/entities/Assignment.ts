import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
