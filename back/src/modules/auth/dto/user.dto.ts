import { IsString, IsNumber, IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '유저 pk id' })
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: '사용자 이름' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Oauth에서 주는 값' })
  readonly uuid: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '스노우볼 갯수' })
  readonly snowball_count: number;

  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    format: 'uuid',
    description: '스노우볼 UUID 리스트'
  })
  readonly snowball_list: string[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메시지 갯수' })
  readonly message_count: number;
}
