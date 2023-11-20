import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateMessageDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '익명 사용자 닉네임(From)' })
  readonly sender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '메세지 내용' })
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 종류' })
  readonly decoration_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly decoration_color: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '편지지 종류' })
  readonly letter_id: number;
}
