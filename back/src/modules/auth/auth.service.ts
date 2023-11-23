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
    const mainSnowballDto: SnowballDto =
      await this.snowballService.getSnowball(1);

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

    let userId;
    if (exisitingUser) {
      userId = exisitingUser.id;

      const snowballCount = await this.SnowballRepository.findAndCount({
        where: { user_id: userId }
      });
      const snowballList = await this.SnowballRepository.find({
        where: { user_id: userId }
      });
      console.log(snowballCount, snowballList);
    } else {
      const newUser: UserEntity = this.UserRepository.create({
        user_id: user.id,
        username: user.name,
        provider: user.provider,
        created_at: new Date()
      });

      const saveduser = await this.UserRepository.insert(newUser);
      userId = saveduser.identifiers.pop().id;
    }
    const userDto: UserDto = {
      id: userId,
      name: user.name,
      auth_id: user.id,
      snowball_count: 3,
      snowball_list: [],
      message_count: 123
    };
    return userDto;
  }

  generateJwtToken(user: any): string {
    const payload = { userid: user.id, username: user.name };
    return this.jwtService.sign(payload);
  }
}
