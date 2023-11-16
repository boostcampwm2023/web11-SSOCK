import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: string;

  @Column()
  deco_id: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column({ nullable: true, default: null })
  opened: string | null;

  @CreateDateColumn()
  created_at: Date;
}
