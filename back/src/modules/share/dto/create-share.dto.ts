import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShareDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '유저 id' })
  readonly user_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;
}
