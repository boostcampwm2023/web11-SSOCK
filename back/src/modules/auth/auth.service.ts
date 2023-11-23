import { Injectable } from '@nestjs/common';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballDto } from '../snowball/dto/snowball.dto';
import { JwtService } from '@nestjs/jwt';
import { SnowballService } from '../snowball/snowball.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
    @InjectRepository(SnowballEntity)
    private readonly SnowballRepository: Repository<SnowballEntity>,
    private readonly jwtService: JwtService,
    private readonly snowballService: SnowballService
  ) {}

  async createInfo(user: any): Promise<ResInfoDto> {
    const { user_pk, is_existed } = await this.getUserPk(user);
    const jwt_token = this.generateJwtToken(user_pk);
    const userDto: UserDto = await this.createUserDto(
      user,
      user_pk,
      is_existed
    );
    const mainSnowballDto: SnowballDto =
      await this.snowballService.getSnowball(1);

    const resInfoDto: ResInfoDto = {
      jwt_token,
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return resInfoDto;
  }

  async createUserDto(
    user: any,
    user_pk: number,
    is_existed: boolean
  ): Promise<UserDto> {
    let snowball_count: number,
      message_count: number,
      snowball_list: { id: number; uuid: string }[],
      main_snowball_id: number | null;
    if (is_existed) {
      const snowballs = await this.SnowballRepository.findAndCount({
        where: { user_id: user_pk }
      });
      snowball_count = snowballs[1];
      snowball_list = snowballs[0].map(snowball => {
        return {
          id: snowball.id,
          uuid: snowball.snowball_uuid
        };
      });
      main_snowball_id = snowballs[0][0].id;
    } else {
      snowball_count = 0;
      message_count = 0;
      snowball_list = [];
      main_snowball_id = null;
    }
    const userDto: UserDto = {
      id: user_pk,
      name: user.name,
      auth_id: user.id,
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

  generateJwtToken(user_pk: any): string {
    const payload = { user_pk: user_pk };
    return this.jwtService.sign(payload);
  }
}
