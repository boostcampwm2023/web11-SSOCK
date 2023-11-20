import { IsNumber, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteMessageDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메세지 id' })
  readonly message_id: number;
}
