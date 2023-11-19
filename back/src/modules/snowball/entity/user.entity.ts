import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn
} from 'typeorm';
import { SnowballEntity } from './snowball.entity';


@Entity({synchronize: true , name: 'user' })
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

  @OneToMany(() => SnowballEntity, snowball => snowball.user_id)
  snowballs: SnowballEntity[];
}
