import { Controller, Post, Put, Body } from '@nestjs/common';
import { SnowballService } from './snowball.service';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse
} from '@nestjs/swagger';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';
import { ResCreateSnowballDto } from './dto/response/res-create-snowball.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';

@ApiTags('Snowball API')
@Controller('snowball')
export class SnowballController {
  constructor(private readonly snowballService: SnowballService) {}

  @Post()
  @ApiOperation({
    summary: '스노우볼 생성 API',
    description: '스노우볼을 생성합니다.'
  })
  @ApiCreatedResponse({
    description: '스노우볼 생성 성공',
    type: ResCreateSnowballDto
  })
  @ApiBody({ type: ReqCreateSnowballDto })
  createSnowball(@Body() createSnowballDto: ReqCreateSnowballDto) {
    return createSnowballDto;
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: '스노우볼 업데이트 성공',
    type: ResUpdateSnowballDto
  })
  @ApiOperation({
    summary: '스노우볼 설정 업데이트 API',
    description: '스노우볼에의 정보를 업데이트 해줍니다.'
  })
  @ApiBody({ type: ReqUpdateSnowballDto })
  updateSnowball(@Body() updateSnowballDto: ReqUpdateSnowballDto) {
    updateSnowballDto;
  }
}
