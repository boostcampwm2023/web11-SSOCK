import { ValidateNested } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateMessageLocationDto } from './update-message-location.dto';
import { Expose, Type } from 'class-transformer';

export class UpdateMessageLocationsDto {
  @Expose()
  @Type(() => UpdateMessageLocationDto)
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [UpdateMessageLocationDto],
    description: '업데이트 할 메세지 위치 리스트'
  })
  readonly location_list: UpdateMessageLocationDto[];
}
