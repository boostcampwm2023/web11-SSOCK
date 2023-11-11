import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RestoreShareDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '암호화된 링크' })
  readonly encrypted_link: string;
}
