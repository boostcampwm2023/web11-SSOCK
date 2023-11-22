import { Injectable } from '@nestjs/common';
import { ResInfoDto } from './dto/response/res-info.dto';
import { UserDto } from './dto/user.dto';
import { SnowballDto } from '../snowball/dto/snowball.dto';
import { JwtService } from '@nestjs/jwt';
import { SnowballService } from '../snowball/snowball.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly snowballService: SnowballService
  ) {}

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
    const mainSnowballDto: SnowballDto =
      await this.snowballService.getSnowball(1);

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
