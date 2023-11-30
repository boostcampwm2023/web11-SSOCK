import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Length
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateSnowballDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;
}
