import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import { ReqDeleteMessageDto } from './dto/request/req-delete-message.dto';
import { MessageEntity } from './entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto
  ): Promise<MessageEntity> {
    const messageEntity = this.messageRepository.create({
      snowball_id: createMessageDto.snowball_id,
      decoration_id: createMessageDto.decoration_id,
      content: createMessageDto.content,
      sender: createMessageDto.sender
      // opened와 created_at은 자동으로 설정됩니다.
    });
    return await this.messageRepository.save(messageEntity);
  }
  async deleteMessage(deleteMessageDto: ReqDeleteMessageDto): Promise<void> {
    await this.messageRepository.delete(deleteMessageDto.message_id);
  }

  async findAllMessage(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }
}
