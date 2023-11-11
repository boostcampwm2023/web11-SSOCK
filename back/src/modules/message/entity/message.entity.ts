import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: number;

  @Column()
  deco_id: number;

  @Column()
  content: string;

  @Column()
  sender: string;

  @Column({ nullable: true })
  private: string | null;

  @Column({ nullable: true })
  opened: string | null;

  @Column()
  created_at: string;
}
