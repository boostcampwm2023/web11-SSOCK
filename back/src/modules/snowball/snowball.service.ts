import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
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
import { DecorationPrefixEntity } from './entity/decoration-prefix.entity';
import { plainToInstance } from 'class-transformer';

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
    private readonly snowballRepository: Repository<SnowballEntity>,
    @InjectRepository(DecorationPrefixEntity)
    private readonly snowballDecoRepository: Repository<DecorationPrefixEntity>
  ) {}

  async createSnowball(
    user_id: number,
    createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballDto> {
    const userSnowballCount = await this.getSnowballCount(user_id);
    if (userSnowballCount >= 5) {
      throw new BadRequestException(
        '스노우볼은 최대 5개까지 생성할 수 있습니다.'
      );
    }

    const snowball = this.snowballRepository.create({
      user_id: user_id,
      ...createSnowballDto
    });
    const savedSnowball = await this.snowballRepository.save(snowball);

    const combinedSnowballDto: SnowballDto = {
      ...savedSnowball,
      is_message_private: savedSnowball.message_private === null ? false : true,
      message_list: []
    };
    return combinedSnowballDto;
  }

  async getSnowballCount(user_id: number): Promise<number> {
    const snowballCount = await this.snowballRepository.count({
      where: { user_id: user_id }
    });
    return snowballCount;
  }

  // To Do: 조회 성능 테스트 필요
  async doesSnowballExist(snowball_id: number): Promise<boolean> {
    const snowball = await this.snowballRepository.findOne({
      where: { id: snowball_id }
    });
    if (!snowball) {
      throw new NotFoundException('업데이트할 스노우볼이 존재하지 않습니다.');
    }
    return true;
  }

  async updateSnowball(
    updateSnowballDto: ReqUpdateSnowballDto,
    snowball_id: number,
    user_id: number
  ): Promise<ResUpdateSnowballDto> {
    const { title, is_message_private } = updateSnowballDto;

    await this.doesSnowballExist(snowball_id);

    const updateResult = await this.snowballRepository
      .createQueryBuilder()
      .update(SnowballEntity)
      .set({
        title,
        message_private: is_message_private ? new Date() : null
      })
      .where('id = :id', { id: snowball_id })
      .andWhere('user_id = :user_id', { user_id: user_id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('스노우볼 업데이트 권한이 없습니다');
    }

    const resUpdateSnowballDto = {
      snowball_id,
      ...updateSnowballDto
    };
    return plainToInstance(ResUpdateSnowballDto, resUpdateSnowballDto);
  }

  async getSnowball(
    snowball_id: number,
    hasToken: boolean
  ): Promise<SnowballDto> | null {
    const snowball = await this.snowballRepository.findOne({
      where: { id: snowball_id }
    });
    if (!snowball) {
      return null;
    }
    const is_message_private = snowball.message_private ? true : false;
    const is_private_contents = !hasToken && is_message_private;

    const resSnowball: SnowballDto = {
      ...snowball,
      is_message_private: is_message_private,
      message_list: await this.messageService.getMessageList(
        snowball.id,
        is_private_contents === true ? 'private' : 'public'
      )
    };

    return resSnowball;
  }

  async doesDecorationExist(decoration_id: number): Promise<boolean> {
    const decoration = await this.snowballDecoRepository.findOne({
      where: { id: decoration_id, active: true }
    });
    if (!decoration) {
      throw new NotFoundException('업데이트할 장식이 존재하지 않습니다.');
    }
    return true;
  }

  async updateMainDecoration(
    updateMainDecoDto: UpdateMainDecoDto,
    snowball_id: number,
    user_id: number
  ): Promise<UpdateMainDecoDto> {
    await this.doesSnowballExist(snowball_id);
    await this.doesDecorationExist(updateMainDecoDto.main_decoration_id);
    await this.doesDecorationExist(updateMainDecoDto.bottom_decoration_id);

    const updateResult = await this.snowballRepository
      .createQueryBuilder()
      .update(SnowballEntity)
      .set({
        ...updateMainDecoDto
      })
      .where('id = :id', { id: snowball_id })
      .andWhere('user_id = :user_id', { user_id: user_id })
      .execute();

    if (!updateResult.affected) {
      throw new NotFoundException('스노우볼을 업데이트할 권한이 없습니다.');
    }

    return updateMainDecoDto;
  }

  async getMainSnowballDto(
    userDto: UserDto,
    hasToken: boolean
  ): Promise<SnowballDto | null> {
    if (!userDto.main_snowball_id) {
      return null;
    } else {
      return await this.getSnowball(userDto.main_snowball_id, hasToken);
    }
  }

  async getSnowballInfo(user_id: number): Promise<SnowballInfo> {
    const snowballs = await this.snowballRepository.findAndCount({
      where: { user_id: user_id }
    });

    const [items = [], count = 0] = snowballs;
    if (count > 0) {
      const snowball_list = items.map(snowball => snowball.id);
      return {
        snowball_count: count,
        message_count: await this.messageService.getMessageCount(user_id),
        snowball_list,
        main_snowball_id: items[0].id
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
