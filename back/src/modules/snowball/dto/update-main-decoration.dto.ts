import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsHexColor } from 'class-validator';

export class UpdateMainDecoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly main_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly main_decoration_color: string;
}
