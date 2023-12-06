import {
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
  IsHexColor,
  Length,
  Min
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { MessageDto } from '../../message/dto/message.dto';

export class SnowballDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  @ApiProperty({ type: String, description: '스노우볼 제목' })
  readonly title: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly id: number;

  @Transform(({ value }) => (value !== null ? true : false))
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: '스노우볼 속 메시지들 비공개 여부'
  })
  readonly is_message_private: boolean;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: '스노우볼 메인 장식 데코레이션 id'
  })
  readonly main_decoration_id: number;

  @Expose()
  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 메인 장식 색상' })
  readonly main_decoration_color: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @ApiProperty({
    type: Number,
    description: '스노우볼 하단 장식 데코레이션 id'
  })
  readonly bottom_decoration_id: number;

  @Expose()
  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '스노우볼 하단 장식 색상' })
  readonly bottom_decoration_color: string;

  @Expose()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [MessageDto],
    description: '스노우볼 속 메시지 리스트'
  })
  readonly message_list: MessageDto[];
}
