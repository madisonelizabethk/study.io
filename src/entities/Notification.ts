import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  assignment: string;

  @Column({ unique: true })
  dueTime: number;

  @Column({ unique: true })
  class: string;
}
