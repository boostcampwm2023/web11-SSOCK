import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import { ReqDeleteMessageDto } from './dto/request/req-delete-message.dto';
import { MessageEntity } from './entity/message.entity';
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto
  ): Promise<ResCreateMessageDto> {
    const messageEntity = this.messageRepository.create({
      snowball_id: createMessageDto.snowball_id,
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      decoration_id: createMessageDto.decoration_id,
      decoration_color: createMessageDto.decoration_color,
      letter_id: createMessageDto.letter_id
      // opened와 created_at은 자동으로 설정
    });
    const savedMessage = await this.messageRepository.save(messageEntity);

    // 이 부분에서 필터링 로직을 작성
    const resCreateMessage: ResCreateMessageDto = {
      sender: savedMessage.sender,
      content: savedMessage.content
    };

    return resCreateMessage;
  }
  async deleteMessage(deleteMessageDto: ReqDeleteMessageDto): Promise<void> {
    await this.messageRepository.delete(deleteMessageDto.message_id);
  }

  async findAllMessage(): Promise<MessageEntity[]> {
    return await this.messageRepository.find();
  }
}
