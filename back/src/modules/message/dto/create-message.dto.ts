import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '메세지 내용' })
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly deco_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '익명 사용자 닉네임(From)' })
  readonly sender: string;
}
