import { Controller, Get, Req, Param, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResInfoDto } from './dto/response/res-info.dto';
import { AuthService } from './auth.service';
import { ResVisitInfoDto } from './dto/response/res-visit-info.do';

@ApiTags('Oauth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @ApiOperation({
    summary: 'Google 로그인 요청 API',
    description: 'Google OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/google/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/google/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: 200,
    description: 'Google 로그인 성공 및 Info 반환',
    type: ResInfoDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async googleLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const userInfo = req.user;
    const result = this.authService.createUserInfo(userInfo);
    res.status(200).redirect('http://www.mysnowball.kr').send(result);
  }

  @Get('naver')
  @ApiOperation({
    summary: 'Naver 로그인 요청 API',
    description: 'Naver OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/naver/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/naver/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  @ApiResponse({
    status: 200,
    description: 'Naver 로그인 성공 및 Info 반환',
    type: ResInfoDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async naverLoginCallBack(@Req() req): Promise<ResInfoDto> {
    const userInfo = req.user;
    const result = this.authService.createUserInfo(userInfo);
    return result;
  }

  @Get('kakao')
  @ApiOperation({
    summary: 'Kakao 로그인 요청 API',
    description: 'Kakao OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr/auth/kakao/redirect'로 GET요청을 보냅니다.`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/auth/kakao/failure'로 GET요청을 보냅니다.`
  })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  @ApiResponse({
    status: 200,
    description: 'Kakao 로그인 성공 및 Info 반환',
    type: ResInfoDto
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async kakaoLoginCallBack(@Req() req): Promise<ResInfoDto> {
    const userInfo = req.user;
    const result = this.authService.createUserInfo(userInfo);
    return result;
  }

  @Get('visit/:user_id')
  @ApiOperation({
    summary: '방문자 유저 조회 API',
    description: '방문자가 접속한 유저의 정보를 반환합니다'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ResVisitInfoDto
  })
  async createVisitInfo(
    @Param('user_id') user_id: string
  ): Promise<ResVisitInfoDto> {
    const result = this.authService.createVisitInfo(user_id);
    return result;
  }
}
