import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

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
}
