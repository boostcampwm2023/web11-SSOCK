import { IsBoolean, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsUUID } from 'class-validator';
import { DecorationSnowballDto } from './decoration-snowball.dto';

export class ResCreateSnowballDto {
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID()
  snowball_uuid: string;

  @ApiProperty({ description: '생성된 스노우볼의 제목' })
  @IsString()
  title: string;

  @ValidateNested({ each: true })
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '데코오브젝트들이 들어있는 리스트'
  })
  readonly deco_list: DecorationSnowballDto[];

  @ApiProperty({ description: '메시지들의 공개 여부 (True이면 비공개)' })
  @IsBoolean()
  message_private: boolean;

  @ApiProperty({ description: '받은 메시지 수 공개 여부 (True이면 비공개)' })
  @IsBoolean()
  message_count_private: boolean;

  @ApiProperty({ description: '스노우볼이 언제 생성되었는지' })
  @IsDate()
  createdAt: Date;
}
