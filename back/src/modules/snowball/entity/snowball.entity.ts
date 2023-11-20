import { IsUUID } from '@nestjs/class-validator';
import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SnowballDecorationEntity } from './snowball-decoration.entity';
import { MessageEntity } from '../../message/entity/message.entity';

@Entity({ synchronize: true ,name: 'snowball' })
export class SnowballEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @IsUUID('4')
  @Column({ length: 36 })
  snowball_uuid: string;

  @Column({ length: 16 })
  title: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn({ nullable: true, default: null })
  message_private: Date | null;

  @CreateDateColumn({ nullable: true, default: null })
  message_count_private: Date | null;

  @ManyToOne(() => UserEntity, user => user.snowballs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => MessageEntity, message => message.snowball_id)
  message_snowballs: MessageEntity[];

  @OneToMany(
    () => SnowballDecorationEntity,
    snowball_deco => snowball_deco.snowball_id
  )
  deco_snowballs: SnowballDecorationEntity[];

  beforeInsert() {
    this.snowball_uuid = uuidv4();
  }
}
