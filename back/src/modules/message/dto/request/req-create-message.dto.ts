import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsHexColor,
  Length,
  Min,
  Max
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateMessageDto {
  @IsString()
  @Length(1, 16)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '익명 사용자 닉네임(From)' })
  readonly sender: string;

  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '메세지 내용' })
  readonly content: string;

  // To Do: decoration_prefix 테이블 사용
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id', example: 1 })
  readonly decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly decoration_color: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '편지지 종류', example: 1 })
  readonly letter_id: number;
}
