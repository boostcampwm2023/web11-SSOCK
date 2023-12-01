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
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';
import { MessageDto } from './dto/message.dto';
import { plainToClass } from '@nestjs/class-transformer';
import { UpdateMessageDecorationDto } from './dto/update-message-decoration.dto';
import { UpdateMessageLocationDto } from './dto/update-message-location.dto';
import { PrivateMessageDto } from './dto/private-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    user_id: number,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    if (!(await this.isInsertAllowed(snowball_id)))
      throw new ConflictException('메세지 갯수가 30개를 초과했습니다');

    const location = await this.findLocation(user_id);
    const messageEntity = this.messageRepository.create({
      user_id: user_id,
      snowball_id: snowball_id,
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      decoration_id: createMessageDto.decoration_id,
      decoration_color: createMessageDto.decoration_color,
      location: location,
      letter_id: createMessageDto.letter_id,
      opened: null
      // is_deleted랑 created는 자동으로 설정
    });
    const savedMessage = await this.messageRepository.insert(messageEntity);
    if (!savedMessage.raw.affectedRows)
      throw new InternalServerErrorException('insert fail');
    // 이 부분에서 필터링 로직을 작성
    const resCreateMessage: ResCreateMessageDto = {
      sender: createMessageDto.sender,
      content: createMessageDto.content,
      location: location
    };

    return resCreateMessage;
  }

  async isInsertAllowed(snowball_id: number): Promise<boolean> {
    const messageCount = await this.messageRepository.count({
      where: { snowball_id: snowball_id, is_deleted: false }
    });
    if (messageCount >= 30) return false;
    else return true;
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
    const messages: MessageEntity[] = await this.messageRepository.find({
      where: { user_id: user_id, is_deleted: false }
    });
    // To Do: 인터셉터
    if (!messages) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
    const messagesDto: MessageDto[] = plainToClass(MessageDto, messages);
    return messagesDto;
  }

  async openMessage(message_id: number): Promise<MessageDto> {
    const message = await this.messageRepository.findOne({
      where: { id: message_id }
    });
    // 커스텀 데코레이터로
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

  async updateMessageDecoration(
    message_id: number,
    updateMessageDecorationDto: UpdateMessageDecorationDto
  ): Promise<UpdateMessageDecorationDto> {
    const { decoration_id, decoration_color } = updateMessageDecorationDto;
    const updateResult = await this.messageRepository
      .createQueryBuilder()
      .update(MessageEntity)
      .set({
        decoration_id,
        decoration_color
      })
      .where('id = :id', { id: message_id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트할 메시지가 존재하지 않습니다.');
    } else if (updateResult.affected > 1) {
      throw new InternalServerErrorException('서버측 오류');
    }
    return updateMessageDecorationDto;
  }

  async updateMessageLocation(
    message_id: number,
    updateMessageLocationDto: UpdateMessageLocationDto
  ): Promise<UpdateMessageLocationDto> {
    //TODO: location이 available 한지 확인 해야함
    const { location } = updateMessageLocationDto;
    const updateResult = await this.messageRepository
      .createQueryBuilder()
      .update(MessageEntity)
      .set({
        location
      })
      .where('id = :id', { id: message_id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트할 메시지가 존재하지 않습니다.');
    } else if (updateResult.affected > 1) {
      throw new InternalServerErrorException('서버측 오류');
    }
    return updateMessageLocationDto;
  }

  async getMessageCount(user_id: number): Promise<number> {
    return this.messageRepository.count({
      where: { user_id: user_id, is_deleted: false }
    });
  }

  async getMessageList(
    snowball_id: number,
    is_private_contents: boolean
  ): Promise<MessageDto[] | PrivateMessageDto[]> {
    const messages = await this.messageRepository.find({
      where: { snowball_id: snowball_id, is_deleted: false },
      select: [
        'id',
        'decoration_id',
        'decoration_color',
        'letter_id',
        'content',
        'sender',
        'opened',
        'created',
        'location'
      ]
    });
    if (is_private_contents) {
      const privateMessages = messages.map(message => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { letter_id, content, sender, ...rest } = message;
        return rest;
      });
      return plainToClass(PrivateMessageDto, privateMessages);
    }
    return plainToClass(MessageDto, messages);
  }

  async findLocation(user_id: number): Promise<number> {
    const findLocations = this.messageRepository
      .createQueryBuilder('message')
      .select('location')
      .where('user_id = :user_id', { user_id })
      .andWhere('is_deleted = false');
    const locations = await findLocations.getRawMany();

    let firstEmptyLocation: number | null = null;
    for (let i = 1; i <= 30; i++) {
      const exists = locations.some(result => result.location === i);
      if (!exists) {
        firstEmptyLocation = i;
        break;
      }
    }
    if (firstEmptyLocation === null)
      throw new ConflictException('location에 빈자리가 없습니다');
    return firstEmptyLocation;
  }
}
