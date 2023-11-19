import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReqCreateMessageDto {
  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty({ type: String, description: '스노우볼 uuid' })
  readonly snowball_id: string;

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
}
