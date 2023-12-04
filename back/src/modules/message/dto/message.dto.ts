/* eslint-disable @typescript-eslint/no-unused-vars */
import { Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsDate,
  IsHexColor,
  Min,
  Max
} from 'class-validator';

export class MessageDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: '메시지 ID' })
  readonly id: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly decoration_id: number;

  @Expose()
  @IsHexColor()
  @ApiProperty({ type: String, description: '장식 색상' })
  readonly decoration_color: string;

  @Expose()
  @Transform(value => undefined, { groups: ['private'] })
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, description: '편지지 종류' })
  readonly letter_id: number;

  @Expose()
  @Transform(value => undefined, { groups: ['private'] })
  @IsString()
  @Length(1, 500)
  @ApiProperty({ type: String, description: '메시지 내용' })
  readonly content: string;

  @Expose()
  @Transform(value => undefined, { groups: ['private'] })
  @IsString()
  @Length(1, 16)
  @ApiProperty({ type: String, description: '보낸이' })
  readonly sender: string;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: '열린 날짜' })
  readonly opened: Date | null;

  @Expose()
  @IsDate()
  @ApiProperty({ type: Date, description: '생성 날짜' })
  readonly created: Date;

  @Expose()
  @IsString()
  @Length(1, 8)
  @ApiProperty({
    type: String,
    description: '메세지에서 추출한 감정'
  })
  readonly sentiment: string;

  @Expose()
  @IsNumber()
  @ApiProperty({ type: Number, description: '신뢰도' })
  readonly confidence: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(72)
  @ApiProperty({ type: Number, description: '메세지 위치' })
  readonly location: number;
}
