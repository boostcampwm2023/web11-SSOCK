import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsHexColor, Min } from 'class-validator';

export class UpdateMainDecoDto {
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 id' })
  readonly main_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly main_decoration_color: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: '스노우볼 하단 장식 데코레이션 id'
  })
  readonly bottom_decoration_id: number;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '스노우볼 하단 장식 색상',
    example: '#FFFFFF'
  })
  readonly bottom_decoration_color: string;
}
