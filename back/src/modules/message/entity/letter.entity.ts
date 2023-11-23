import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'letter_prefix' })
export class LetterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;
}
