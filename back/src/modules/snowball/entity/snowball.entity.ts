import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { UserEntity } from '../../auth/entity/user.entity';
import { SnowballDecorationEntity } from './snowball-decoration.entity';
import { MessageEntity } from '../../message/entity/message.entity';

@Entity({ name: 'snowball' })
export class SnowballEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 16 })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn({ nullable: true, default: null })
  message_private: Date | null;

  @ManyToOne(() => UserEntity, user => user.snowballs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => MessageEntity, message => message.snowball)
  messages: MessageEntity[];

  @OneToMany(() => SnowballDecorationEntity, decoration => decoration.snowball)
  decorations: SnowballDecorationEntity[];
}
