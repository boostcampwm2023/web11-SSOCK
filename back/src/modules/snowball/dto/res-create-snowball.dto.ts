import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsUUID } from 'class-validator';
export class ResCreateSnowballDto {
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID('4')
  snowball_uuid: string;

  @ApiProperty({ description: '필터링된 스노우볼의 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '스노우볼 생성 시간' })
  @IsDate()
  created_at: Date;
}
