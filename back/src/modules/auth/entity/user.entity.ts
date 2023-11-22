import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn
} from 'typeorm';
import { SnowballEntity } from '../../snowball/entity/snowball.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  user_id: string;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 16 })
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SnowballEntity, snowball => snowball.user)
  snowballs: SnowballEntity[];
}
