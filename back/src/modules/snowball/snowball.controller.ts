import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
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
import { SnowballDto } from './dto/snowball.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';
import { ReqUpdateSnowballDecoDto } from './dto/request/req-update-decoration.dto';
import { ResUpdateSnowballDecoDto } from './dto/response/res-update-decoration.dto';

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
    type: SnowballDto
  })
  @ApiBody({ type: ReqCreateSnowballDto })
  createSnowball(@Body() createSnowballDto: ReqCreateSnowballDto) {
    const snowball = this.snowballService.createSnowball(createSnowballDto);
    return snowball;
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: '스노우볼 데코레이션 업데이트 성공',
    type: ResUpdateSnowballDecoDto
  })
  @ApiOperation({
    summary: '스노우볼 데코레이션 업데이트 API',
    description: '스노우볼의 데코레이션들을 업데이트 해줍니다.'
  })
  @ApiBody({ type: ReqUpdateSnowballDecoDto })
  updateSnowballDecor(@Body() updateSnowballDecoDto: ReqUpdateSnowballDecoDto) {
    const snowballDecoration = this.snowballService.updateSnowballDeco(
      updateSnowballDecoDto
    );
    return snowballDecoration;
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
    const snowball = this.snowballService.updateSnowball(updateSnowballDto);
    return snowball;
  }

  @Get('/:snowball_id/messages')
  @ApiResponse({
    status: 200,
    description: '스노우볼 메시지들 조회 성공',
    type: SnowballDto
  })
  @ApiOperation({
    summary: '스노우볼 메시지들 조회 API',
    description: '스노우볼에 속한 메시지들을 조회합니다.'
  })
  async getMessages(@Param('snowball_id') snowball_id: number) {
    const messages = await this.snowballService.getMessages(snowball_id);
    return messages;
  }
}
