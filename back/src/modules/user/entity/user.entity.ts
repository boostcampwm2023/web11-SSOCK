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

  // kakao, naver, google에서 주는 거임
  @Column({ length: 16 })
  username: string;

  // 닉네임?? 16자?
  @Column({ length: 16, default: null })
  nickname: string | null;

  // kakao, naver, google
  @Column({ length: 6 })
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SnowballEntity, snowball => snowball.user)
  snowballs: SnowballEntity[];

  @OneToMany(() => MessageEntity, message => message.user)
  messages: MessageEntity[];
}
