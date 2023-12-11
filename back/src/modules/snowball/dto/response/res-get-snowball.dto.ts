import { IsNumber, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SnowballDto } from '../snowball.dto';

export class ResGetSnowballDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ type: Number, description: '메세지 총 개수' })
  readonly message_count: number;

  @ApiProperty({
    type: SnowballDto,
    description: '스노우볼 정보'
  })
  readonly snowball: SnowballDto;
}
