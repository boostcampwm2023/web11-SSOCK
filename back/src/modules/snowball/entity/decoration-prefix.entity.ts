import { Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'decoration_prefix' })
export class DecorationPrefixEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
