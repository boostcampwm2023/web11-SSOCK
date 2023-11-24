import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'decoration_prefix' })
export class DecorationPrefixEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
