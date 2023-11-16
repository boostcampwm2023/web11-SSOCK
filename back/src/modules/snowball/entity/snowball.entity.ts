import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'snowball' })
export class SnowballEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  snowball_id: string;

  @Column()
  user_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  private: string | null;

  @Column()
  created_at: string;
}
