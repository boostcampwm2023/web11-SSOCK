import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballService } from '../snowball/snowball.service';
import { NicknameDto } from './dto/nickname.dto';
import { plainToInstance } from 'class-transformer';
import { JWTRequest } from 'src/common/interface/request.interface';

interface userData {
  id: number;
  name: string;
  auth_id: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly snowballService: SnowballService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserData(auth_id: string): Promise<userData> {
    const exisitingUser = await this.userRepository.findOne({
      where: { auth_id: auth_id },
      select: ['id', 'username', 'auth_id']
    });
    if (exisitingUser) {
      return {
        ...exisitingUser,
        name: exisitingUser.username
      };
    } else {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }
  }

  async getUserNickname(id: number): Promise<string> | null {
    const exisitingUser = await this.userRepository.findOne({
      where: { id: id },
      select: ['nickname']
    });
    if (exisitingUser) {
      return exisitingUser.nickname;
    } else {
      return null;
    }
  }

  async createUserInfo(
    user: any,
    hasToken: boolean,
    isUser: boolean
  ): Promise<ResInfoDto> {
    const userDto: UserDto = await this.createUserDto(
      user.id,
      user.name,
      user.auth_id
    );
    console.log(userDto);
    const mainSnowballDto = await this.snowballService.getMainSnowballDto(
      userDto,
      hasToken,
      isUser
    );

    const resInfoDto = {
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return plainToInstance(ResInfoDto, resInfoDto, {
      enableCircularCheck: true
    });
  }

  async createUserDto(
    id: number,
    username: string,
    auth_id: string
  ): Promise<UserDto> {
    const userInfo = await this.snowballService.getSnowballInfo(id);
    const nickname = await this.getUserNickname(id);
    const userDto = {
      id: id,
      username: username,
      nickname: nickname,
      auth_id: auth_id,
      ...userInfo
    };
    return plainToInstance(UserDto, userDto);
  }

  async updateNickname(
    req: JWTRequest,
    nicknameDto: NicknameDto
  ): Promise<NicknameDto> {
    try {
      const updateResult = await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          nickname: nicknameDto.nickname
        })
        .where('id = :id', { id: req.user.id })
        .execute();
      if (!updateResult.affected) {
        throw new NotFoundException('업데이트할 유저가 존재하지 않습니다.');
      }
    } catch (err) {
      throw err;
    }
    return nicknameDto;
  }
}
