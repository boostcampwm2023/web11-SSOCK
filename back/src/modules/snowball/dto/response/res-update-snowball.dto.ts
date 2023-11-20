import { IsString, IsBoolean, IsNumber } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResUpdateSnowballDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
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
}
