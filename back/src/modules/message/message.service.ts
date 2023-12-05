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
import { UpdateMessageLocationDto } from './dto/update-message-location.dto';
import { plainToInstance, instanceToPlain } from 'class-transformer';
import { LetterEntity } from './entity/letter.entity';
import { ResClovaSentiment } from './clova.service';
import { SnowballEntity } from '../snowball/entity/snowball.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>,
    @InjectRepository(LetterEntity)
    private readonly letterRepository: Repository<LetterEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    resClovaSentiment: ResClovaSentiment,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    try {
      this.isInsertAllowed(snowball_id);
      this.doesLetterIdExist(createMessageDto.letter_id);
    } catch (err) {
      throw new InternalServerErrorException('서버 에러');
    }
    const user_id = await this.findUserId(snowball_id);
    const location = await this.findLocation(snowball_id);
    const messageEntity = this.messageRepository.create({
      user_id: user_id,
      snowball_id: snowball_id,
      location: location,
      opened: null,
      ...resClovaSentiment,
      ...createMessageDto
      // is_deleted랑 created는 자동으로 설정
    });
    try {
      await this.messageRepository.save(messageEntity, {
        reload: false
      });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Insert Fail');
    }

    const resCreateMessage = {
      ...createMessageDto,
      ...resClovaSentiment,
      location: location
    };

    return plainToInstance(ResCreateMessageDto, resCreateMessage, {
      excludeExtraneousValues: true
    });
  }

  async isInsertAllowed(snowball_id: number): Promise<void> {
    const messageCount = await this.messageRepository.count({
      where: { snowball_id: snowball_id, is_deleted: false }
    });
    if (messageCount >= 30)
      throw new ConflictException('메세지 갯수가 30개를 초과했습니다');
  }

  async doesLetterIdExist(letter_id: number): Promise<void> {
    const letter = await this.letterRepository.findOne({
      where: { id: letter_id, active: true }
    });
    if (!letter) throw new NotFoundException('존재하지 않는 letter id입니다');
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
      await this.messageRepository.save(
        { id: message_id, is_deleted: true },
        { reload: false }
      );
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
    await this.messageRepository.save(
      { id: message_id, opened: Date() },
      { reload: false }
    );
    const messageDto = plainToInstance(
      MessageDto,
      instanceToPlain(messageEntity),
      { groups: ['public'] }
    );
    return messageDto;
  }

  async updateMessageLocation(
    message_id: number,
    updateMessageLocationDto: UpdateMessageLocationDto
  ): Promise<UpdateMessageLocationDto> {
    const { location } = updateMessageLocationDto;
    const updateResult = await this.messageRepository
      .createQueryBuilder()
      .update(MessageEntity)
      .set({
        location
      })
      .where('id = :id', { id: message_id, is_deleted: false })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트를 실패했습니다');
    } else if (updateResult.affected > 1) {
      throw new InternalServerErrorException('데이터 중복 오류');
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
    const user = await this.snowballRepository.findOne({
      select: ['user_id'],
      where: { id: snowball_id }
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
