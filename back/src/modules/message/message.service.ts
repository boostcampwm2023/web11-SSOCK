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
import { UpdateMessageDecorationDto } from './dto/update-message-decoration.dto';
import { UpdateMessageLocationDto } from './dto/update-message-location.dto';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { LetterEntity } from './entity/letter.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(LetterEntity)
    private readonly letterRepository: Repository<LetterEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    if (!(await this.isInsertAllowed(snowball_id)))
      throw new ConflictException('메세지 갯수가 30개를 초과했습니다');
    if (!(await this.hasLetterId(createMessageDto.letter_id)))
      throw new NotFoundException('해당 letter_id가 존재하지 않습니다');

    const user_id = await this.findUserId(snowball_id);
    const location = await this.findLocation(snowball_id);
    const messageEntity = this.messageRepository.create({
      user_id: user_id,
      snowball_id: snowball_id,
      location: location,
      opened: null,
      ...createMessageDto
      // is_deleted랑 created는 자동으로 설정
    });
    const savedMessage = await this.messageRepository.insert(messageEntity);
    if (!savedMessage.raw.affectedRows)
      throw new InternalServerErrorException('insert fail');

    const resCreateMessage = {
      ...createMessageDto,
      location: location
    };

    return plainToInstance(ResCreateMessageDto, resCreateMessage, {
      excludeExtraneousValues: true
    });
  }

  async isInsertAllowed(snowball_id: number): Promise<boolean> {
    const messageCount = await this.messageRepository.count({
      where: { snowball_id: snowball_id, is_deleted: false }
    });
    if (messageCount >= 30) return false;
    else return true;
  }

  async hasLetterId(letter_id: number): Promise<boolean> {
    const letter = await this.letterRepository.findOne({
      where: { id: letter_id, active: true }
    });
    if (!letter) return false;
    else return true;
  }

  async deleteMessage(user_id: number, message_id: number): Promise<void> {
    try {
      const message = await this.messageRepository.findOne({
        where: { id: message_id },
        select: ['user_id', 'is_deleted']
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
      throw new InternalServerErrorException('서버 오류');
    }
  }

  async getAllMessages(user_id: number): Promise<MessageDto[]> {
    const messageEntities = await this.messageRepository.find({
      where: { user_id: user_id, is_deleted: false }
    });
    if (!messageEntities) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }
    const messageDtos = messageEntities.map(entity =>
      plainToInstance(MessageDto, instanceToPlain(entity), {
        groups: ['public']
      })
    );
    return messageDtos;
  }

  async openMessage(message_id: number): Promise<MessageDto> {
    const messageEntity = await this.messageRepository.findOne({
      where: { id: message_id, is_deleted: false }
    });
    if (!messageEntity) {
      throw new NotFoundException(
        `${message_id}번 메시지를 찾을 수 없었습니다.`
      );
    }
    if (messageEntity.opened !== null) {
      throw new ConflictException(
        `${message_id}번 메시지는 이미 열려있습니다.`
      );
    }
    const date = new Date();
    await this.messageRepository.update(message_id, { opened: date });
    const messageDto = plainToInstance(
      MessageDto,
      instanceToPlain(messageEntity),
      { groups: ['public'] }
    );
    return messageDto;
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
    groups: string
  ): Promise<MessageDto[]> {
    const messageEntities = await this.messageRepository.find({
      where: { snowball_id: snowball_id, is_deleted: false }
    });

    const messageDtos = messageEntities.map(entity =>
      plainToInstance(MessageDto, instanceToPlain(entity), {
        groups: [groups],
        exposeUnsetFields: false
      })
    );
    return messageDtos;
  }

  async findUserId(snowball_id: number): Promise<number> {
    const user = await this.messageRepository.findOne({
      select: ['user_id'],
      where: { snowball_id: snowball_id }
    });

    if (!user)
      throw new NotFoundException(
        '해당 스노우볼을 가지고 있는 유저가 존재하지 않습니다'
      );
    return user.user_id;
  }

  async findLocation(snowball_id: number): Promise<number> {
    const findLocations = this.messageRepository
      .createQueryBuilder('message')
      .select('location')
      .where('snowball_id = :snowball_id', { snowball_id })
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
