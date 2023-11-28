import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NicknameDto {
  @IsString()
  @ApiProperty({ type: String, description: '사용자 닉네임' })
  readonly nickname: string | null;
}
