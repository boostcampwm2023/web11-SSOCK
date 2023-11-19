import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsBoolean,
  ValidateNested
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DecorationSnowballDto } from './decoration-snowball.dto';

export class CreateSnowballDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '데코오브젝트들이 들어있는 리스트'
  })
  readonly deco_list: DecorationSnowballDto[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '유저의 id' })
  readonly user_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부를 가리키는 불리언'
  })
  readonly message_private: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지 갯수의 비공개 여부를 가리키는 불리언'
  })
  readonly message_count_private: boolean;
}
