import {
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../auth/entity/user.entity';
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';
import { MessageDto } from './dto/message.dto';
import { SnowballEntity } from '../snowball/entity/snowball.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    const user_id = await this.getUserId(snowball_id);
    const messageEntity = this.messageRepository.create({
      user_id: user_id,
      snowball_id: snowball_id,
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      decoration_id: createMessageDto.decoration_id,
      decoration_color: createMessageDto.decoration_color,
      letter_id: createMessageDto.letter_id,
      opened: null
      // is_deleted랑 created는 자동으로 설정
    });
    const savedMessage = await this.messageRepository.save(messageEntity);

    // 이 부분에서 필터링 로직을 작성
    const resCreateMessage: ResCreateMessageDto = {
      sender: savedMessage.sender,
      content: savedMessage.content
    };

    return resCreateMessage;
  }
  async deleteMessage(user_id: number, message_id: number): Promise<void> {
    try {
      const message = await this.messageRepository.findOne({
        where: { id: message_id }
      });
      if (message.user_id !== user_id) {
        throw new ForbiddenException(
          `${message_id} 메시지는 해당 유저의 메시지가 아닙니다.`
        );
      }
      if (!message) {
        throw new NotFoundException(
          `${message_id} 메시지를 찾을 수 없었습니다.`
        );
      }
      if (message.is_deleted) {
        throw new GoneException(`${message_id}는 이미 삭제된 메시지입니다.`);
      }
      await this.messageRepository.update(message_id, { is_deleted: true });
    } catch (err) {
      throw new InternalServerErrorException('서버측 오류');
    }
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
    const messages: MessageEntity[] = user.snowballs
      .flatMap(snowball => snowball.messages)
      .filter(message => !message.is_deleted);
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

  async openMessage(message_id: number): Promise<MessageDto> {
    const message = await this.messageRepository.findOne({
      where: { id: message_id }
    });
    console.log(message);
    if (!message) {
      throw new NotFoundException(
        `${message_id}번 메시지를 찾을 수 없었습니다.`
      );
    }
    if (message.opened !== null) {
      throw new ConflictException(
        `${message_id}번 메시지는 이미 열려있습니다.`
      );
    }
    const date = new Date();
    await this.messageRepository.update(message_id, { opened: date });
    return {
      ...message,
      opened: date
    };
  }

  async getUserId(snowball_id: number): Promise<number> {
    const snowball = await this.snowballRepository.findOne({
      where: { id: snowball_id }
    });
    return snowball.user_id;
  }
}
