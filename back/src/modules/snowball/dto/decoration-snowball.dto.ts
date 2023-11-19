import { IsNumber, IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecorationSnowballDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '장식 종류' })
  readonly decoration_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '장식 색상', example: '#FFFFFF' })
  readonly decoration_color: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '위치값' })
  readonly location: number;
}
