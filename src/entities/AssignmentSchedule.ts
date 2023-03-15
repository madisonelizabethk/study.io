import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AssignmentSchedule {
  @PrimaryGeneratedColumn('uuid')
  className: string;

  @Column({ unique: true })
  assignmentType: string;

  @Column({ unique: true })
  dueDate: string;

  @Column({ unique: true })
  dueTime: number;
}
