import { IsString, IsNotEmpty, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user.dto';
import { SnowballDto } from '../../../snowball/dto/snowball.dto';
import { Type } from '@nestjs/class-transformer';

export class ResInfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Bearer 타입의 OAuth 2.0 액세스 토큰',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  readonly access_token: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
    description: '사용자 정보 배열'
  })
  readonly user: UserDto[];

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SnowballDto)
  @ApiProperty({
    type: SnowballDto,
    description: '메인 스노우볼 정보 배열'
  })
  readonly main_snowball: SnowballDto[];
}
