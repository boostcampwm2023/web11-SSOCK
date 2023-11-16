import { IsString, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
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
  @ApiProperty({ type: Number, description: '데코오브젝트 id' })
  readonly decoration_id: number;
}
