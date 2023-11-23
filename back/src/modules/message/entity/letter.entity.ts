import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity()
export class LetterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => MessageEntity, message => message.letter_id)
  messages: MessageEntity[];
}
