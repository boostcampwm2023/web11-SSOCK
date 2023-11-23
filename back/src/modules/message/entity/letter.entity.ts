import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'letter_prefix' })
export class LetterEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
