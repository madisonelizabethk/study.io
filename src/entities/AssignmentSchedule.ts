import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  
}
