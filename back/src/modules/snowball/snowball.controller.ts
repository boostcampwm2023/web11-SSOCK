import {
  Controller,
  Post,
  Put,
  Body,
  Param,
  Get,
  HttpCode,
  UseGuards,
  Req,
  UseInterceptors
} from '@nestjs/common';
import { SnowballService } from './snowball.service';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiResponse,
  ApiCookieAuth
} from '@nestjs/swagger';
import { ReqCreateSnowballDto } from './dto/request/req-create-snowball.dto';
import { ReqUpdateSnowballDto } from './dto/request/req-update-snowball.dto';
import { SnowballDto } from './dto/snowball.dto';
import { ResUpdateSnowballDto } from './dto/response/res-update-snowball.dto';
import { JWTGuard } from '../../common/guards/jwt.guard';
import { UpdateMainDecoDto } from './dto/update-main-decoration.dto';
import { JWTRequest } from '../../common/interface/request.interface';
import { hasJWTInterceptor } from '../../common/interceptors/hasJwt.interceptor';
import { Throttle } from '@nestjs/throttler';
import { ResGetSnowballDto } from './dto/response/res-get-snowball.dto';

@ApiTags('Snowball API')
@Controller('snowball')
export class SnowballController {
  constructor(private readonly snowballService: SnowballService) {}

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: '스노우볼 생성 API',
    description: '스노우볼을 생성합니다.'
  })
  @ApiCreatedResponse({
    description: '스노우볼 생성 성공',
    type: SnowballDto
  })
  @ApiBody({ type: ReqCreateSnowballDto })
  createSnowball(
    @Req() req: JWTRequest,
    @Body() createSnowballDto: ReqCreateSnowballDto
  ): Promise<SnowballDto> {
    const snowball = this.snowballService.createSnowball(
      req.user.id,
      createSnowballDto
    );
    return snowball;
  }

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
  @Put('/:snowball_id')
  @HttpCode(200)
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
  updateSnowball(
    @Param('snowball_id') snowball_id: number,
    @Req() req: JWTRequest,
    @Body() updateSnowballDto: ReqUpdateSnowballDto
  ) {
    const snowball = this.snowballService.updateSnowball(
      updateSnowballDto,
      snowball_id,
      req.user.id
    );
    return snowball;
  }

  @Get('/:snowball_id')
  @Throttle({ api: { limit: 10, ttl: 1000 } })
  @UseInterceptors(hasJWTInterceptor)
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: '스노우볼 조회 성공',
    type: ResGetSnowballDto
  })
  @ApiOperation({
    summary: '스노우볼 조회 API',
    description: '스노우볼의 정보를 조회합니다.'
  })
  async getSnowball(
    @Req() req: JWTRequest,
    @Param('snowball_id') snowball_id: number
  ) {
    const resGetSnowballDto = await this.snowballService.getResGetSnowballDto(
      snowball_id,
      req.hasToken
    );
    return resGetSnowballDto;
  }

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
  @Put('/:snowball_id/decoration')
  @ApiResponse({
    status: 200,
    description: '스노우볼 메인 장식 업데이트 성공',
    type: UpdateMainDecoDto
  })
  @ApiOperation({
    summary: '스노우볼 메인 장식 업데이트 API',
    description: '스노우볼의 메인 장식을 업데이트 합니다.'
  })
  @ApiBody({ type: UpdateMainDecoDto })
  async updateMainDecoration(
    @Param('snowball_id') snowball_id: number,
    @Body() updateMainDecoDto: UpdateMainDecoDto,
    @Req() req: JWTRequest
  ) {
    const snowball = await this.snowballService.updateMainDecoration(
      updateMainDecoDto,
      snowball_id,
      req.user.id
    );
    return snowball;
  }
}
