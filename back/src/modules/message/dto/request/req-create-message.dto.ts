import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateMessageDto {
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

  // To Do: location 프론트가 정할 지 우리가 정할 지
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 위치' })
  readonly location: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '편지지 종류' })
  readonly letter_id: number;
}
