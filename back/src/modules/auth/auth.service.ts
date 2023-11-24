import { Injectable, NotFoundException } from '@nestjs/common';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballDto } from '../snowball/dto/snowball.dto';
import { JwtService } from '@nestjs/jwt';
import { SnowballService } from '../snowball/snowball.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { ResVisitInfoDto } from './dto/response/res-visit-info.do';
import { MessageEntity } from '../message/entity/message.entity';
interface SnowballInfo {
  snowball_count: number;
  message_count: number;
  snowball_list: number[];
  main_snowball_id: number | null;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    @InjectRepository(SnowballEntity)
    private readonly SnowballRepository: Repository<SnowballEntity>,
    @InjectRepository(MessageEntity)
    private readonly MessageRepository: Repository<MessageEntity>,
    private readonly jwtService: JwtService,
    private readonly snowballService: SnowballService
  ) {}

  async createUserInfo(user: any): Promise<ResInfoDto> {
    const { user_pk, is_existed } = await this.getUserPk(user);
    const jwt_token = this.generateJwtToken(user_pk);
    const userDto: UserDto = await this.createUserDto(
      user_pk,
      user.name,
      user.id,
      is_existed
    );
    const mainSnowballDto = await this.getMainSnowballDto(userDto);

    const resInfoDto: ResInfoDto = {
      jwt_token,
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return resInfoDto;
  }

  async createVisitInfo(user_id: string): Promise<ResVisitInfoDto> {
    const user = await this.UserRepository.findOne({
      where: { user_id: user_id }
    });
    if (!user) throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    const userDto: UserDto = await this.createUserDto(
      user.id,
      user.username,
      user.user_id,
      true
    );
    const mainSnowballDto = await this.getMainSnowballDto(userDto);

    const resVisitInfo: ResVisitInfoDto = {
      user: userDto,
      main_snowball: mainSnowballDto
    };
    return resVisitInfo;
  }

  async createUserDto(
    user_pk: number,
    username: string,
    user_id: string,
    is_existed: boolean
  ): Promise<UserDto> {
    const { snowball_count, message_count, snowball_list, main_snowball_id } =
      await this.getSnowballInfo(user_pk, is_existed);

    const userDto: UserDto = {
      id: user_pk,
      name: username,
      auth_id: user_id,
      snowball_count: snowball_count,
      main_snowball_id: main_snowball_id,
      snowball_list: snowball_list,
      message_count: message_count
    };
    return userDto;
  }

  async getUserPk(
    user: any
  ): Promise<{ user_pk: number; is_existed: boolean }> {
    const exisitingUser = await this.UserRepository.findOne({
      where: { user_id: user.id }
    });
    if (exisitingUser) {
      return { user_pk: exisitingUser.id, is_existed: true };
    } else {
      const newUser: UserEntity = this.UserRepository.create({
        user_id: user.id,
        username: user.name,
        provider: user.provider,
        created_at: new Date()
      });

      const saveduser = await this.UserRepository.insert(newUser);
      const pk = saveduser.identifiers.pop().id;
      return { user_pk: pk, is_existed: false };
    }
  }

  async getMainSnowballDto(userDto: UserDto): Promise<SnowballDto | null> {
    if (!userDto.main_snowball_id) {
      return null;
    } else {
      return await this.snowballService.getSnowball(userDto.main_snowball_id);
    }
  }

  async getSnowballInfo(
    user_pk: number,
    is_existed: boolean
  ): Promise<SnowballInfo> {
    if (is_existed) {
      const snowballs = await this.SnowballRepository.findAndCount({
        where: { user_id: user_pk }
      });
      const snowball_list = snowballs[0].map(snowball => snowball.id);
      return {
        snowball_count: snowballs[1],
        message_count: await this.getMessageCount(user_pk),
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

  async getMessageCount(user_pk: number): Promise<number> {
    return this.MessageRepository.count({ where: { user: { id: user_pk } } });
  }

  generateJwtToken(user_pk: any): string {
    const payload = { user_pk: user_pk };
    return this.jwtService.sign(payload);
  }
}
