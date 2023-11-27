import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';
import { SnowballDto } from './dto/snowball.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';
import { UpdateMainDecoDto } from './dto/update-main-decoration.dto';

@Injectable()
export class SnowballService {
  constructor(
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>
  ) {}

  async createSnowball(
    userid: number,
    createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballDto> {
    const snowball = this.snowballRepository.create({
      user_id: userid,
      title: createSnowballDto.title,
      message_private: createSnowballDto.is_message_private ? new Date() : null
    });
    const savedSnowball = await this.snowballRepository.save(snowball);

    const combinedSnowballDto: SnowballDto = {
      id: savedSnowball.id,
      title: savedSnowball.title,
      main_decoration_color: savedSnowball.main_decoration_color,
      main_decoration_id: savedSnowball.main_decoration_id,
      is_message_private: savedSnowball.message_private === null ? false : true,
      message_list: []
    };
    return combinedSnowballDto;
  }

  async updateSnowball(
    updateSnowballDto: ReqUpdateSnowballDto,
    snowball_id: number
  ): Promise<ResUpdateSnowballDto> {
    const { title, is_message_private } = updateSnowballDto;

    const updateResult = await this.snowballRepository
      .createQueryBuilder()
      .update(SnowballEntity)
      .set({
        title,
        message_private: is_message_private ? new Date() : null
      })
      .where('id = :id', { id: snowball_id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트할 스노우볼이 존재하지 않습니다.');
    }

    // Return the updated snowball
    const resUpdateSnowballDto: ResUpdateSnowballDto = {
      snowball_id,
      title,
      is_message_private
    };

    return resUpdateSnowballDto;
  }

  async getSnowball(snowball_id: number): Promise<SnowballDto> | null {
    const snowball = await this.snowballRepository.findOne({
      where: { id: snowball_id },
      relations: {
        messages: true
      }
    });
    if (!snowball) {
      return null;
    }

    const resSnowball: SnowballDto = {
      id: snowball.id,
      title: snowball.title,
      is_message_private: snowball.message_private ? true : false,
      message_list: snowball.messages.map(message => ({
        id: message.id,
        decoration_id: message.decoration_id,
        decoration_color: message.decoration_color,
        content: message.content,
        sender: message.sender,
        opened: message.opened,
        created: message.created,
        letter_id: message.letter_id,
        location: message.location
      })),
      main_decoration_id: 0,
      main_decoration_color: ''
    };

    return resSnowball;
  }

  async updateMainDecoration(
    updateMainDecoDto: UpdateMainDecoDto,
    snowball_id: number
  ): Promise<UpdateMainDecoDto> {
    const { main_decoration_id, main_decoration_color } = updateMainDecoDto;

    const updateResult = await this.snowballRepository
      .createQueryBuilder()
      .update(SnowballEntity)
      .set({
        main_decoration_id: main_decoration_id,
        main_decoration_color: main_decoration_color
      })
      .where('id = :id', { id: snowball_id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트할 스노우볼이 존재하지 않습니다.');
    }

    return updateMainDecoDto;
  }
}
