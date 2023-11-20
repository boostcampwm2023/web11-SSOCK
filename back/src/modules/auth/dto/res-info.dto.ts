import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { MainSnowballDto } from './main-snowball.dto';
import { Type } from '@nestjs/class-transformer';

export class InfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Bearer 타입의 OAuth 2.0 액세스 토큰',
    example: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  readonly access_token: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
    description: '사용자 정보 배열'
  })
  readonly user: UserDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MainSnowballDto)
  @ApiProperty({
    type: MainSnowballDto,
    description: '메인 스노우볼 정보 배열'
  })
  readonly main_snowball: MainSnowballDto[];
}
