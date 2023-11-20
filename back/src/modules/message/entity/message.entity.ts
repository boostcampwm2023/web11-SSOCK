import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { SnowballEntity } from 'src/modules/snowball/entity/snowball.entity';

@Entity({ synchronize: true, name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: number;

  @Column()
  decoration_id: number;

  @Column({ length: 7 })
  decoration_color: string;

  @Column()
  letter_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ length: 16 })
  sender: string;

  @CreateDateColumn({ nullable: true, default: null })
  opened: Date | null;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => SnowballEntity, snowball => snowball.messages)
  @JoinColumn({ name: 'snowball_id' })
  snowball: SnowballEntity;
}
