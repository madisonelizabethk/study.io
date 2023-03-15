import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  vocabTerm: string;

  @Column({ unique: true })
  vocabDefinition: string;
}
