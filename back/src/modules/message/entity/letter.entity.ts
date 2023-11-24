import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'letter_prefix' })
export class LetterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
