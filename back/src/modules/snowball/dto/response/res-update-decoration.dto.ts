import { IsNotEmpty, IsNumber, ValidateNested } from '@nestjs/class-validator';
import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DecorationSnowballDto } from '../decoration-snowball.dto';

export class ResUpdateSnowballDecoDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: '스노우볼 id' })
  readonly snowball_id: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DecorationSnowballDto)
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '변경된 데코오브젝트들이 들어있는 배열'
  })
  readonly deco_list: DecorationSnowballDto[];
}
