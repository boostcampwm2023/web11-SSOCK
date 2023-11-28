import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
  CreateDateColumn
} from 'typeorm';
import { SnowballEntity } from '../../snowball/entity/snowball.entity';
import { MessageEntity } from 'src/modules/message/entity/message.entity';

@Entity({ name: 'user' })
@Index(['user_id'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  user_id: string;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 16, default: null })
  nickname: string | null;

  @Column({ length: 16 })
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SnowballEntity, snowball => snowball.user)
  snowballs: SnowballEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];
}
