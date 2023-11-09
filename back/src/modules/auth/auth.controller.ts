import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiOAuth2 } from '@nestjs/swagger';

@ApiTags('Oauth API')
@Controller('auth')
export class AuthController {
  @Get('google')
  @ApiOperation({
    summary: 'Google 로그인 요청 API',
    description: 'Google Oauth api에 로그인 요청을 보낸다.'
  })
  @ApiOAuth2([])
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }
}
