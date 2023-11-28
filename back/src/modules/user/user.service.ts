import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballService } from '../snowball/snowball.service';
import { NicknameDto } from './dto/nickname.dto';

interface userData {
  id: number;
  name: string;
  user_id: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly snowballService: SnowballService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getUserData(user_id: string): Promise<userData> {
    const exisitingUser = await this.userRepository.findOne({
      where: { user_id: user_id }
    });
    if (exisitingUser) {
      return {id:exisitingUser.id, name:exisitingUser.username, user_id:exisitingUser.user_id};
    } else {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }
  }

  async getUserNickname(id: number): Promise<string> {
    const exisitingUser = await this.userRepository.findOne({
      where: { id: id }
    });
    if (exisitingUser) {
      return exisitingUser.nickname;
    } else {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }
  }

  async createUserInfo(user: any): Promise<ResInfoDto> {
    const userDto: UserDto = await this.createUserDto(
      user.id,
      user.name,
      user.user_id
    );
    const mainSnowballDto =
      await this.snowballService.getMainSnowballDto(userDto);

    const resInfoDto: ResInfoDto = {
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return resInfoDto;
  }

  async createUserDto(
    id: number,
    username: string,
    user_id: string
  ): Promise<UserDto> {
    const { snowball_count, message_count, snowball_list, main_snowball_id } =
      await this.snowballService.getSnowballInfo(id);
    const nickname = await this.getUserNickname(id);
    console.log(nickname);
    const userDto: UserDto = {
      id: id,
      username: username,
      nickname: nickname,
      user_id: user_id,
      snowball_count: snowball_count,
      main_snowball_id: main_snowball_id,
      snowball_list: snowball_list,
      message_count: message_count
    };
    return userDto;
  }

  async updateNickname(id: number, nicknameDto: NicknameDto): Promise<NicknameDto> {
    const updateResult = await this.userRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        nickname:nicknameDto.nickname
      })
      .where('id = :id', { id: id })
      .execute();
    if (!updateResult.affected) {
      throw new NotFoundException('업데이트할 유저가 존재하지 않습니다.');
    }
    return nicknameDto;
  }
}
