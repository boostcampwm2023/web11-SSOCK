import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메시지 위치' })
  readonly location: number;
}
