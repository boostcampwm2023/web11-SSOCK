import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';
import { SnowballDto } from './dto/snowball.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';
import { UpdateMainDecoDto } from './dto/update-main-decoration.dto';
import { UserDto } from '../user/dto/user.dto';
import { MessageService } from '../message/message.service';

export interface SnowballInfo {
  snowball_count: number;
  message_count: number;
  snowball_list: number[];
  main_snowball_id: number | null;
}

@Injectable()
export class SnowballService {
  constructor(
    private readonly messageService: MessageService,
    @InjectRepository(SnowballEntity)
    private readonly snowballRepository: Repository<SnowballEntity>
  ) {}

  async isValidSnowball(snowball_id: number): Promise<boolean> {
    return await this.snowballRepository.exist({
      where: { id: snowball_id }
    });
  }

  async createSnowball(
    userid: number,
    createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballDto> {
    const snowball = this.snowballRepository.create({
      user_id: userid,
      title: createSnowballDto.title,
      main_decoration_color: createSnowballDto.main_decoration_color,
      main_decoration_id: createSnowballDto.main_decoration_id,
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
      where: { id: snowball_id }
    });
    if (!snowball) {
      return null;
    }

    const resSnowball: SnowballDto = {
      id: snowball.id,
      title: snowball.title,
      main_decoration_id: snowball.main_decoration_id,
      main_decoration_color: snowball.main_decoration_color,
      is_message_private: snowball.message_private ? true : false,
      message_list: await this.messageService.getMessageList(snowball.id)
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

  async getMainSnowballDto(userDto: UserDto): Promise<SnowballDto | null> {
    if (!userDto.main_snowball_id) {
      return null;
    } else {
      return await this.getSnowball(userDto.main_snowball_id);
    }
  }

  async getSnowballInfo(user_pk: number): Promise<SnowballInfo> {
    const snowballs = await this.snowballRepository.findAndCount({
      where: { user_id: user_pk }
    });

    if (snowballs[0].length > 0) {
      const snowball_list = snowballs[0].map(snowball => snowball.id);
      return {
        snowball_count: snowballs[1],
        message_count: await this.messageService.getMessageCount(user_pk),
        snowball_list,
        main_snowball_id: snowballs[0][0].id
      };
    } else {
      return {
        snowball_count: 0,
        message_count: 0,
        snowball_list: [],
        main_snowball_id: null
      };
    }
  }
}
