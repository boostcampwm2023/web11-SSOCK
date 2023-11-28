import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsHexColor
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateSnowballDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly main_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly main_decoration_color: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;
}
