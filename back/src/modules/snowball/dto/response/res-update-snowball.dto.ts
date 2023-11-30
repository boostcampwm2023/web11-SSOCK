import {
  IsString,
  IsBoolean,
  IsNumber,
  Min,
  Length
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResUpdateSnowballDto {
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;

  @IsString()
  @Length(1, 10)
  @ApiProperty({ type: String, description: '변경된 스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '변경된 스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;
}
