import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { MessageEntity } from './entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}
  async createMessage(
    createMessageDto: CreateMessageDto
  ): Promise<MessageEntity> {
    const message = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(message);
  }
  async deleteMessage(deleteMessageDto: DeleteMessageDto): Promise<void> {
    await this.messageRepository.delete(deleteMessageDto.message_id);
  }

  async findAllMessage(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }
}
