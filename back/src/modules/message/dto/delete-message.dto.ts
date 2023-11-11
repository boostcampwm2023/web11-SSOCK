import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메세지 id' })
  readonly message_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;
}
