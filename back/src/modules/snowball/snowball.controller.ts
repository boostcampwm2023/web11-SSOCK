import { Controller, Post, Put, Body } from '@nestjs/common';
import { SnowballService } from './snowball.service';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateSnowballDto } from './dto/create-snowball.dto';
import { UpdateSnowballDto } from './dto/update-snowball.dto';

@ApiTags('Snowball API')
@Controller('snowball')
export class SnowballController {
  constructor(private readonly snowballService: SnowballService) {}

  @Post()
  @ApiOperation({
    summary: '스노우볼 생성 API',
    description: '스노우볼을 생성합니다.'
  })
  @ApiBody({ type: CreateSnowballDto })
  createSnowball(@Body() createSnowballDto: CreateSnowballDto) {
    return createSnowballDto;
  }

  @Put()
  @ApiOperation({
    summary: '스노우볼 설정 업데이트 API',
    description: '스노우볼에의 정보를 업데이트 해줍니다.'
  })
  @ApiBody({ type: UpdateSnowballDto })
  updateSnowball(@Body() updateSnowballDto: UpdateSnowballDto) {
    updateSnowballDto;
  }
}
