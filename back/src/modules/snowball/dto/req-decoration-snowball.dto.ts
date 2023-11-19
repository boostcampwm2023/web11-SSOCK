import { IsNotEmpty, ValidateNested, IsUUID } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecorationSnowballDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '스노우볼 uuid',
    format: 'uuid'
  })
  readonly snowball_id: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [DecorationSnowballDto],
    description: '데코오브젝트들이 들어있는 리스트'
  })
  readonly deco_list: DecorationSnowballDto[];
}
