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
@Index(['auth_id'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  auth_id: string;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 16, default: null })
  nickname: string | null;

  @Column({ length: 6 })
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SnowballEntity, snowball => snowball.user)
  snowballs: SnowballEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];
}
