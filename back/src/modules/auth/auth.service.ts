import { Injectable } from '@nestjs/common';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballDto } from '../snowball/dto/snowball.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createInfo(user: any): Promise<ResInfoDto> {
    const jwt_token = this.generateJwtToken(user);
    const userDto: UserDto = {
      id: 1,
      name: '김찬우',
      auth_id: 'Oauth에서 주는 값',
      snowball_count: 3,
      snowball_list: [
        { id: 1, uuid: '32413434-32a2-2342-3242-3g23-413oye3' },
        { id: 2, uuid: '32413434-32a2-2342-3242-3g23-413oye4' },
        { id: 3, uuid: '32413434-32a2-2342-3242-3g23-413oye5' }
      ],
      message_count: 123
    };
    const mainSnowballDto: SnowballDto = {
      title: '나만의 스노우볼1',
      id: 1,
      uuid: '32413434-32a2-2342-3242-3g23-413oye3',
      message_private: null,
      deco_list: [
        {
          decoration_id: 15,
          decoration_color: '#FFFFFF',
          location: 13
        },
        {
          decoration_id: 12,
          decoration_color: '#FFFFFF',
          location: 14
        }
      ],
      message_list: [
        {
          id: 1,
          decoration_id: 15,
          decoration_color: '#FFFFFF',
          letter_id: 1,
          content: '편지 내용',
          sender: '널 좋아하는 사람',
          opened: null,
          created: new Date('2023-12-30T17:35:31Z')
        },
        {
          id: 2,
          decoration_id: 15,
          decoration_color: '#FFFFFF',
          letter_id: 1,
          content: '편지 내용',
          sender: '찬우를 사랑하는 사람',
          opened: null,
          created: new Date('2023-12-30T17:35:31Z')
        }
      ]
    };

    const resInfoDto: ResInfoDto = {
      jwt_token,
      user: userDto,
      main_snowball: mainSnowballDto
    };

    return resInfoDto;
  }

  generateJwtToken(user: any): string {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
