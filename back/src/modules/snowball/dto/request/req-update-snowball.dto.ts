import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsBoolean
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateSnowballDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly message_private: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지 갯수 비공개 여부'
  })
  readonly message_count_private: boolean;
}
