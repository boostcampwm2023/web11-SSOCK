import {
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  BadRequestException,
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
import { DecorationPrefixEntity } from '../snowball/entity/decoration-prefix.entity';
import { UpdateMessageLocationsDto } from './dto/update-message-locations.dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(LetterEntity)
    private readonly letterRepository: Repository<LetterEntity>,
    @InjectRepository(DecorationPrefixEntity)
    private readonly decorationPrefixRepository: Repository<DecorationPrefixEntity>
  ) {}
  async createMessage(
    createMessageDto: ReqCreateMessageDto,
    resClovaSentiment: ResClovaSentiment,
    auth_id: string,
    snowball_id: number
  ): Promise<ResCreateMessageDto> {
    await this.isInsertAllowed(snowball_id);
    await this.doesDecoIdExist(createMessageDto.decoration_id);
    await this.doesLetterIdExist(createMessageDto.letter_id);

    const user_id = await this.findUserId(snowball_id);
    await this.compareUser(auth_id, user_id);
    const location = await this.findLocation(snowball_id);
    const messageEntity = this.messageRepository.create({
      user_id: user_id,
      snowball_id: snowball_id,
      location: location,
      ...resClovaSentiment,
      ...createMessageDto
    });
    try {
      const resCreateMessage = await this.messageRepository.save(messageEntity);
      return plainToInstance(ResCreateMessageDto, resCreateMessage, {
        excludeExtraneousValues: true
      });
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Insert Fail');
    }
  }

  async isInsertAllowed(snowball_id: number): Promise<void> {
    const messageCount = await this.messageRepository.count({
      where: {
        snowball_id: snowball_id,
        is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
      }
    });
    if (messageCount >= 30) {
      throw new ConflictException('메세지 갯수가 30개를 초과했습니다');
    }
  }

  async doesDecoIdExist(decoration_id: number): Promise<void> {
    const decoration = await this.decorationPrefixRepository.findOne({
      where: { id: decoration_id, active: true }
    });
    if (!decoration) {
      throw new NotFoundException('존재하지 않는 decoration id입니다');
    }
  }

  async doesLetterIdExist(letter_id: number): Promise<void> {
    const letter = await this.letterRepository.findOne({
      where: { id: letter_id, active: true }
    });
    if (!letter) {
      throw new NotFoundException('존재하지 않는 letter id입니다');
    }
  }

  async deleteMessage(user_id: number, message_id: number): Promise<void> {
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
      throw new NotFoundException(`${message_id} 메시지를 찾을 수 없었습니다.`);
    }
    console.log(message.is_deleted.getTime());

    if (message.is_deleted.getTime() !== Number(process.env.TIME_DEFAULT)) {
      throw new GoneException(`${message_id}는 이미 삭제된 메시지입니다.`);
    }
    await this.messageRepository.save(
      { id: message_id, is_deleted: new Date() },
      { transaction: false, reload: false }
    );
  }

  async getAllMessages(user_id: number): Promise<MessageDto[]> {
    const messageEntities = await this.messageRepository.find({
      where: {
        user_id: user_id,
        is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
      }
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
      where: {
        id: message_id,
        is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
      }
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
      { id: message_id, opened: new Date() },
      { transaction: false, reload: false }
    );
    const messageDto = plainToInstance(
      MessageDto,
      instanceToPlain(messageEntity),
      { groups: ['public'] }
    );
    return messageDto;
  }

  async updateMessageLocations(
    updateDtos: UpdateMessageLocationsDto
  ): Promise<UpdateMessageLocationsDto> {
    const result: UpdateMessageLocationDto[] = [];
    console.log(updateDtos.location_list);
    for (const updateDto of updateDtos.location_list) {
      const success = await this.updateMessageLocation(updateDto);
      if (success) result.push(updateDto);
    }
    const instance = { location_list: result };
    return plainToInstance(UpdateMessageLocationsDto, {
      instance
    });
  }

  async updateMessageLocation(
    updateDto: UpdateMessageLocationDto
  ): Promise<boolean> {
    const { message_id, location } = updateDto;

    try {
      await this.messageRepository
        .createQueryBuilder()
        .update(MessageEntity)
        .set({
          location
        })
        .where('id = :id', {
          id: message_id,
          is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
        })
        .execute();
    } catch (err) {
      console.log(err.sqlMessage);
      return false;
    }
    return true;
  }

  async getMessageCount(user_id: number): Promise<number> {
    return this.messageRepository.count({
      where: {
        user_id: user_id,
        is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
      }
    });
  }

  async getMessageList(
    snowball_id: number,
    groups: string
  ): Promise<MessageDto[]> {
    const messageEntities = await this.messageRepository.find({
      where: {
        snowball_id: snowball_id,
        is_deleted: new Date(`${process.env.DATE_DEFAULT}`)
      }
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

  async compareUser(auth_id: string, user_id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      select: ['id'],
      where: { auth_id: auth_id }
    });
    if (!user) throw new NotFoundException('해당 유저가 존재하지 않습니다');
    if (user.id !== user_id) {
      throw new BadRequestException('해당 유저의 스노우볼이 아닙니다');
    }
  }

  async findLocation(snowball_id: number): Promise<number> {
    const locations = await this.messageRepository
      .createQueryBuilder()
      .select('location')
      .where('snowball_id = :snowball_id', { snowball_id })
      .andWhere('is_deleted =:is_deleted', {
        is_deleted: `${process.env.DATE_DEFAULT}`
      })
      .getRawMany();

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
