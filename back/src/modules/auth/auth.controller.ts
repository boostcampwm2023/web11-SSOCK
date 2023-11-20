import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResInfoDto } from './dto/response/res-info.dto';
import { AuthService } from './auth.service';

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
    description: 'Google 로그인 성공',
    type: ResInfoDto
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async googleLoginCallback(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    const result = this.authService.createInfo(profile);
    res.status(200).json(result);
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
    description: 'Naver 로그인 성공',
    type: ResInfoDto
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async naverLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    const result = this.authService.createInfo(profile);
    res.status(200).json(result);
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
    description: 'Kakao 로그인 성공',
    type: ResInfoDto
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async kakaoLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    const result = this.authService.createInfo(profile);
    res.status(200).json(result);
  }
}
