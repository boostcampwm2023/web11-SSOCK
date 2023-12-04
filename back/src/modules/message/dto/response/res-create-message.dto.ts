import {
  IsString,
  IsNotEmpty,
  Length,
  IsNumber,
  Min,
  Max
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResCreateMessageDto {
  @Expose()
  @IsString()
  @Length(1, 16)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '필터링된 익명 사용자 닉네임(From)'
  })
  readonly sender: string;

  @Expose()
  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '필터링된 메세지 내용' })
  readonly content: string;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(72)
  @ApiProperty({ type: Number, description: '메세지 위치' })
  readonly location: number;
}
