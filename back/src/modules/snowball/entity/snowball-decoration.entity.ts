import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { SnowballEntity } from './snowball.entity';

@Entity({ name: 'snowball_decoration' })
export class SnowballDecorationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: number;

  @Column()
  decoration_id: number;

  @Column({ length: 7 })
  decoration_color: string;

  @Column()
  location: number;

  @ManyToOne(() => SnowballEntity, snowball => snowball.decorations)
  @JoinColumn({ name: 'snowball_id' })
  snowball: SnowballEntity;
}
