import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SnowballDecorationEntity } from './snowball-decoration.entity';

@Entity()
export class DecorationPrefixEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => SnowballDecorationEntity,
    snowballDecoration => snowballDecoration.decoration_id
  )
  decorations: SnowballDecorationEntity[];
}
