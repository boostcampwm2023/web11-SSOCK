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
  readonly username: string;

  @IsString()
  @ApiProperty({ type: String, description: '사용자 닉네임' })
  readonly nickname: string | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Oauth에서 주는 값' })
  readonly user_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '스노우볼 갯수' })
  readonly snowball_count: number;

  @IsNumber()
  @ApiProperty({ type: Number, description: '메인 스노우볼 id' })
  readonly main_snowball_id: number | null;

  @IsNotEmpty()
  @ApiProperty({
    type: [Number],
    description: '스노우볼 id 리스트'
  })
  readonly snowball_list: number[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, description: '메시지 갯수' })
  readonly message_count: number;
}
