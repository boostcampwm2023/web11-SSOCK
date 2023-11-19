<<<<<<< HEAD
import { IsBoolean, ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsUUID } from 'class-validator';
import { DecorationSnowballDto } from './decoration-snowball';

export class ResCreateSnowballDto {
=======
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDate, IsUUID } from 'class-validator';

export class ResCreateSnowballDto {
  @ApiProperty({ description: '스노우볼을 만든 유저의 id' })
  @IsUUID()
  user_id: string;

>>>>>>> a3e84de (feat: response dto 생성)
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  @IsUUID()
  snowball_uuid: string;

  @ApiProperty({ description: '생성된 스노우볼의 제목' })
  @IsString()
  title: string;

<<<<<<< HEAD
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
=======
  @ApiProperty({ description: '스노우볼 안에 생성된 데코레이션들의 정보' })
  @IsString({ each: true })
  decoration_list: string[];

  @ApiProperty({ description: '메시지들의 공개 여부 (True이면 비공개)' })
  @IsString()
  message_private: string;

  @ApiProperty({ description: '받은 메시지 수 공개 여부 (True이면 비공개)' })
  @IsNumber()
  message_count_private: number;
>>>>>>> a3e84de (feat: response dto 생성)

  @ApiProperty({ description: '스노우볼이 언제 생성되었는지' })
  @IsDate()
  createdAt: Date;
}
