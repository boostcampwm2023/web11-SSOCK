import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({ type: String, description: '유저 ID' })
  readonly user_id: string;

  @IsString()
  @ApiProperty({ type: String, description: '유저 Password' })
  readonly password: string;

  @IsString()
  @ApiProperty({ type: String, description: '유저 Nickname' })
  readonly nickname: string;
}
