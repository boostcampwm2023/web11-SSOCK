import { Length } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDate,
  IsHexColor,
  Min,
  Max
} from 'class-validator';

export class MessageDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: '메시지 ID' })
  readonly id: number;

  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly decoration_id: number;

  @IsHexColor()
  @ApiProperty({ type: String, description: '장식 색상' })
  readonly decoration_color: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @ApiProperty({ type: Number, description: '편지지 종류' })
  readonly letter_id: number;

  @IsString()
  @Length(1, 500)
  @ApiProperty({ type: String, description: '메시지 내용' })
  readonly content: string;

  @IsString()
  @Length(1, 16)
  @ApiProperty({ type: String, description: '보낸이' })
  readonly sender: string;

  @IsDate()
  @ApiProperty({ type: Date, description: '열린 날짜' })
  readonly opened: Date | null;

  @IsDate()
  @ApiProperty({ type: Date, description: '생성 날짜' })
  readonly created: Date;

  @IsNumber()
  @Min(1)
  @Max(72)
  @ApiProperty({ type: Number, description: '메세지 위치' })
  readonly location: number;
}
