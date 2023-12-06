import { IsNotEmpty, IsNumber, Min, Max } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageLocationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메세지 ID' })
  readonly message_id: number;

  @IsNumber()
  @Min(1)
  @Max(72)
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메시지 위치' })
  readonly location: number;
}
