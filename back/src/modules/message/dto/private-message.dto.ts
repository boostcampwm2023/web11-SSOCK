import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsHexColor, Min, Max } from 'class-validator';

export class PrivateMessageDto {
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
