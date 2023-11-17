import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiExcludeEndpoint,
  ApiResponse
} from '@nestjs/swagger';

@ApiTags('Oauth API')
@Controller('auth')
export class AuthController {
  @Get('google')
  @ApiOperation({
    summary: 'Google 로그인 요청 API',
    description: 'Google OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr'로 리다이렉트`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/failure'으로 리다이렉트`
  })
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }

  @Get('naver')
  @ApiOperation({
    summary: 'Naver 로그인 요청 API',
    description: 'Naver OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr'으로 리다이렉트`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/failure'으로 리다이렉트`
  })
  @UseGuards(AuthGuard('naver'))
  async naverLogin(): Promise<void> {}

  @Get('naver/redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('naver'))
  async naverLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }

  @Get('kakao')
  @ApiOperation({
    summary: 'Kakao 로그인 요청 API',
    description: 'Kakao OAuth API에 로그인 요청을 보냅니다.'
  })
  @ApiResponse({
    status: 200,
    description: `'https://mysnowball.kr'으로 리다이렉트`
  })
  @ApiResponse({
    status: 400,
    description: `'https://mysnowball.kr/failure'으로 리다이렉트`
  })
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(): Promise<void> {}

  @Get('kakao/redirect')
  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }
}
