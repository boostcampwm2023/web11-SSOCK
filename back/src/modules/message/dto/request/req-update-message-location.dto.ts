import { IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateMessageLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메시지 위치' })
  readonly location: number;
}
