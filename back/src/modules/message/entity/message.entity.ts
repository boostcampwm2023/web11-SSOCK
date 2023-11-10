import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';
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

  @IsDateString()
  @ApiProperty({
    type: String,
    description: '비공개 설정 시간, 공개 시 null로 설정'
  })
  readonly private: string | null;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly deco_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '익명 사용자 닉네임(From)' })
  readonly sender: string;

  @IsDateString()
  @ApiProperty({
    type: String,
    description: '메세지 열람 시간, 비열람 시 null로 설정'
  })
  readonly opened: string | null;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '메세지 생성 시간'
  })
  readonly created_at: string;
}
