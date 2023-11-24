import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user.dto';
import { SnowballDto } from '../../../snowball/dto/snowball.dto';

export class ResVisitInfoDto {
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
