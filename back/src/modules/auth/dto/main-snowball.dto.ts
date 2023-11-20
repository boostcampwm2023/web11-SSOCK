import {
  IsString,
  IsUUID,
  IsBoolean,
  IsNotEmpty,
  IsArray,
  ValidateNested
} from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DecorationSnowballDto } from '../../snowball/dto/decoration-snowball.dto';
import { MessageDto } from './message.dto';

export class MainSnowballDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsUUID('4')
  @IsNotEmpty()
  @ApiProperty({ format: 'uuid', description: '스노우볼 UUID' })
  readonly uuid: string;

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

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DecorationSnowballDto)
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '데코오브젝트들이 들어있는 리스트'
  })
  readonly deco_list: DecorationSnowballDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  @ApiProperty({
    type: [MessageDto],
    description: '스노우볼 속 메시지 리스트'
  })
  readonly message_list: MessageDto[];
}
