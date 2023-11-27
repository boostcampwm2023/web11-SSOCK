import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsBoolean
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateSnowballDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '유저의 id' })
  readonly user_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;
}
