import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsUUID } from 'class-validator';

export class ResCreateSnowballDto {
  @ApiProperty({ description: '스노우볼을 만든 유저의 id' })
  @IsUUID()
  user_id: string;

  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID()
  snowball_uuid: string;

  @ApiProperty({ description: '생성된 스노우볼의 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '스노우볼 안에 생성된 데코레이션들의 정보' })
  @IsString({ each: true })
  decoration_list: string[];

  @ApiProperty({ description: '메시지들의 공개 여부 (True이면 비공개)' })
  @IsString()
  message_private: string;

  @ApiProperty({ description: '받은 메시지 수 공개 여부 (True이면 비공개)' })
  @IsNumber()
  message_count_private: number;

  @ApiProperty({ description: '스노우볼이 언제 생성되었는지' })
  @IsDate()
  createdAt: Date;
}
