import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClovaContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Clova 전송 컨텐츠' })
  readonly content: string;
}
