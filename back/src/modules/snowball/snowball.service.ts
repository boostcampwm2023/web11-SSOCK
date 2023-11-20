import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';
import { MessageEntity } from '../message/entity/message.entity';
import { SnowballDto } from './dto/snowball.dto';
import { SnowballDecorationEntity } from './entity/snowball-decoration.entity';
import { DecorationSnowballDto } from './dto/decoration-snowball.dto';
import { ResUpdateSnowballDecoDto } from './dto/response/res-update-decoration.dto';
import { ReqUpdateSnowballDecoDto } from './dto/request/req-update-decoration.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';

@Injectable()
export class SnowballService {
  constructor(
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(SnowballDecorationEntity)
    private readonly decorationRepository: Repository<SnowballDecorationEntity>
  ) {}

  async createSnowball(
    createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballDto> {
    const snowball = this.snowballRepository.create({
      user_id: createSnowballDto.user_id,
      title: createSnowballDto.title,
      message_private: createSnowballDto.message_private ? new Date() : null
    });
    const savedSnowball = await this.snowballRepository.save(snowball);

    // To Do: bulk insert로 변경 & 반환값으로 Dto 생성하기
    const decoList = createSnowballDto.deco_list;
    for (const deco of decoList) {
      await this.createDecoration(savedSnowball.id, deco);
    }
    const combinedSnowballDto: SnowballDto = {
      id: savedSnowball.id,
      uuid: savedSnowball.snowball_uuid,
      title: savedSnowball.title,
      message_private: savedSnowball.message_private === null ? false : true,
      deco_list: decoList,
      message_list: []
    };
    return combinedSnowballDto;
  }

  async createDecoration(
    snowball_id: number,
    deco: DecorationSnowballDto
  ): Promise<DecorationSnowballDto> {
    const decoration = this.decorationRepository.create({
      ...deco,
      snowball_id
    });
    const savedDecoration = await this.decorationRepository.save(decoration);
    const decorationDto: DecorationSnowballDto = {
      decoration_id: savedDecoration.decoration_id,
      decoration_color: savedDecoration.decoration_color,
      location: savedDecoration.location
    };
    return decorationDto;
  }

  async updateSnowballDeco(
    updateSnowballDecoDto: ReqUpdateSnowballDecoDto
  ): Promise<ResUpdateSnowballDecoDto> {
    const { snowball_id, deco_list } = updateSnowballDecoDto;

    // Delete all decorations
    await this.decorationRepository.delete({
      snowball_id
    });

    // Create new decorations
    for (const deco of deco_list) {
      await this.createDecoration(snowball_id, deco);
    }

    // Return the updated snowball
    const resSnowball: ResUpdateSnowballDecoDto = {
      snowball_id,
      deco_list
    };
    return resSnowball;
  }

  async updateSnowball(
    updateSnowballDto: ReqUpdateSnowballDto
  ): Promise<ResUpdateSnowballDto> {
    const { snowball_id, title, message_private } = updateSnowballDto;

    // Update snowball if it exists
    const snowball = await this.snowballRepository.findOne({
      where: { id: snowball_id }
    });

    if (snowball) {
      snowball.title = title;
      snowball.message_private = message_private ? new Date() : null;
      await this.snowballRepository.save(snowball);
    } else {
      throw new NotFoundException('업데이트할 스노우볼이 존재하지 않습니다.');
    }

    // Return the updated snowball
    const resSnowball: ResUpdateSnowballDto = {
      snowball_id,
      title,
      message_private
    };

    return resSnowball;
  }

  async getMessages(snowball_id: number): Promise<SnowballDto> {
    const snowballs = await this.snowballRepository.find({
      where: { id: snowball_id },
      relations: {
        message_snowballs: true,
        deco_snowballs: true
      }
    });
    if (!snowballs) {
      throw new NotFoundException('스노우볼이 존재하지 않습니다.');
    }
    const snowball = snowballs[0];
    console.log(snowball.message_snowballs);

    const resSnowball: SnowballDto = {
      id: snowball.id,
      uuid: snowball.snowball_uuid,
      title: snowball.title,
      message_private: snowball.message_private ? true : false,
      deco_list: snowball.deco_snowballs,
      message_list: snowball.message_snowballs.map(message => ({
        id: message.id,
        decoration_id: message.decoration_id,
        decoration_color: message.decoration_color,
        content: message.content,
        sender: message.sender,
        opened: message.opened,
        created: message.created_at
        // letter_id: message.letter_id
      }))
    };

    return resSnowball;
  }
}
