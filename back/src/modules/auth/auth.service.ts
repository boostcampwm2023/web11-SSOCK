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
    const jwt_token = this.generateJwtToken(user);
    const userDto: UserDto = await this.createUserDto(user);
    const mainSnowballDto: SnowballDto = await this.snowballService.getSnowball(
      userDto.main_snowball_id
    );

    const resInfoDto: ResInfoDto = {
      jwt_token,
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return resInfoDto;
  }

  async createUserDto(user: any): Promise<UserDto> {
    const exisitingUser = await this.UserRepository.findOne({
      where: { user_id: user.id }
    });

    let userId: number,
      snowball_count: number,
      message_count: number,
      snowball_list: { id: number; uuid: string }[],
      main_snowball_id: number | null;
    if (exisitingUser) {
      userId = exisitingUser.id;

      const snowballs = await this.SnowballRepository.findAndCount({
        where: { user_id: userId }
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
      const newUser: UserEntity = this.UserRepository.create({
        user_id: user.id,
        username: user.name,
        provider: user.provider,
        created_at: new Date()
      });

      const saveduser = await this.UserRepository.insert(newUser);
      userId = saveduser.identifiers.pop().id;
      snowball_count = 0;
      message_count = 0;
      snowball_list = [];
      main_snowball_id = null;
    }
    const userDto: UserDto = {
      id: userId,
      name: user.name,
      auth_id: user.id,
      snowball_count: snowball_count,
      main_snowball_id: main_snowball_id,
      snowball_list: snowball_list,
      message_count: message_count
    };
    return userDto;
  }

  generateJwtToken(user: any): string {
    const payload = { userid: user.id, username: user.name };
    return this.jwtService.sign(payload);
  }
}
