import {
  IsString,
  IsUUID,
  IsNotEmpty,
  IsBoolean
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateSnowballDto {
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID('4')
  snowball_uuid: string;

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
