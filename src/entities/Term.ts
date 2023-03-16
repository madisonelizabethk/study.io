import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Term {
  @PrimaryGeneratedColumn('uuid')
  termId: string;

  @Column({ unique: true })
  vocabTerm: string;

  @Column({ unique: true })
  vocabDefinition: string;
}
