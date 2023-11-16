import { IsNumber, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecorationSnowballDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '데코레이션 id' })
  readonly deco_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '위치값' })
  readonly location: number;
}
