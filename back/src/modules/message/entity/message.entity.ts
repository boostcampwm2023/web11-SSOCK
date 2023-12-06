import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { SnowballEntity } from '../../snowball/entity/snowball.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { Exclude } from 'class-transformer';
@Entity({ name: 'message' })
@Unique(['snowball_id', 'location', 'is_deleted'])
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  user_id: number;

  @Column()
  snowball_id: number;

  @Column()
  decoration_id: number;

  @Column({ type: 'char', length: 7 })
  decoration_color: string;

  @Column()
  letter_id: number;

  @Column({ length: 500 })
  content: string;

  @Column({ length: 16 })
  sender: string;

  @Column({ default: false })
  is_deleted: boolean;

  @Column()
  location: number;

  @Column({ length: 8 })
  sentiment: string;

  @Column()
  confidence: number;

  @CreateDateColumn({ default: null })
  opened: Date | null;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => SnowballEntity, snowball => snowball.messages)
  @JoinColumn({ name: 'snowball_id' })
  snowball: SnowballEntity;

  @ManyToOne(() => UserEntity, user => user.messages)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
