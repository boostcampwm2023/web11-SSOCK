import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsHexColor,
  Min,
  Length,
  IsDate
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class ReqCreateSnowballDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly main_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly main_decoration_color: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: '스노우볼 하단 장식 데코레이션 id'
  })
  readonly bottom_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '스노우볼 하단 장식 색상',
    example: '#FFFFFF'
  })
  readonly bottom_decoration_color: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => (value === true ? new Date() : null))
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;
}
