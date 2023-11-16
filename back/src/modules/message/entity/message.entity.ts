import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { SnowballEntity } from 'src/modules/snowball/entity/snowball.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: string;

  @Column()
  decoration_id: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @CreateDateColumn({ nullable: true, default: null })
  opened: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => SnowballEntity, message => message.message_snowballs)
  @JoinColumn({ name: 'snowball_id' })
  message_snowballs: SnowballEntity;
}
