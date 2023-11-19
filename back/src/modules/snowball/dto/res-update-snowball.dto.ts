import { IsString, IsUUID, IsBoolean } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResUpdateSnowballDto {
  @IsUUID()
  @ApiProperty({
    type: String,
    description: '변경된 스노우볼의 uuid',
    format: 'uuid'
  })
  readonly snowball_id: number;

  @IsString()
  @ApiProperty({ type: String, description: '변경된 스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '변경된 스노우볼 속 메시지들 비공개 여부'
  })
  readonly message_private: boolean;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
    description: '변경된 스노우볼 속 메시지 갯수 비공개 여부'
  })
  readonly message_count_private: boolean;
}
