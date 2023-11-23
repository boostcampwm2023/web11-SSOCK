import { IsString, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user.dto';
import { SnowballDto } from '../../../snowball/dto/snowball.dto';

export class ResInfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'JWT 타입의 유저 토큰'
  })
  readonly jwt_token: string;

  @IsNotEmpty()
  @ApiProperty({
    type: UserDto,
    description: '사용자 정보 '
  })
  readonly user: UserDto;

  @IsNotEmpty()
  @ApiProperty({
    type: SnowballDto,
    description: '메인 스노우볼 정보'
  })
  readonly main_snowball: SnowballDto | null;
}
