import { IsString, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: '필터링된 익명 사용자 닉네임(From)'
  })
  readonly sender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '필터링된 메세지 내용' })
  readonly content: string;
}
