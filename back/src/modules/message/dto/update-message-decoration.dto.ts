import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsHexColor, Min } from 'class-validator';

export class UpdateMessageDecorationDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly decoration_color: string;
}
