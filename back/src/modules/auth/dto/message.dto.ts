import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate } from 'class-validator';

export class MessageDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: '메시지 ID' })
  readonly id: number;

  @IsString()
  @ApiProperty({ type: String, description: '스노우볼 ID' })
  readonly snowball_id: string;

  @IsNumber()
  @ApiProperty({ type: Number, description: '데코레이션 ID' })
  readonly decoration_id: number;

  @IsString()
  @ApiProperty({ type: String, description: '데코레이션 색상' })
  readonly decoration_color: string;

  @IsString()
  @ApiProperty({ type: String, description: '메시지 내용' })
  readonly content: string;

  @IsString()
  @ApiProperty({ type: String, description: '보낸이' })
  readonly sender: string;

  @IsDate()
  @ApiProperty({ type: Date, description: '열린 날짜' })
  readonly opened: Date | null;

  @IsDate()
  @ApiProperty({ type: Date, description: '생성 날짜' })
  readonly created_at: Date;
}
