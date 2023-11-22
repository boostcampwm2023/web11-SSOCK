import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import { ReqDeleteMessageDto } from './dto/request/req-delete-message.dto';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../auth/entity/user.entity';
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    const messageEntity = this.messageRepository.create({
      snowball_id: snowball_id,
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      decoration_id: createMessageDto.decoration_id,
      decoration_color: createMessageDto.decoration_color,
      letter_id: createMessageDto.letter_id
      // opened와 created는 자동으로 설정
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

  async getAllMessages(user_id: number): Promise<MessageDto[]> {
    //To Do: query builder로 개선하기
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      relations: {
        snowballs: {
          messages: true
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
    const messages: MessageEntity[] = user.snowballs.flatMap(
      snowball => snowball.messages
    );
    const messagesDto: MessageDto[] = messages.map(message => {
      const {
        id,
        decoration_id,
        decoration_color,
        letter_id,
        content,
        sender,
        opened,
        created
      } = message;
      return {
        id,
        decoration_id,
        decoration_color,
        letter_id,
        content,
        sender,
        opened,
        created
      };
    });
    return messagesDto;
  }
}
