import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsHexColor } from 'class-validator';

export class ReqUpdateMessageDecorationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly decoration_color: string;
}
