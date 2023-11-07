import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google')
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
  async snsLogin4Naver(): Promise<void> {}

  @Get('naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async snsLogin4NaverCallBack(@Req() req, @Res() res): Promise<void> {
    const profile: string = req.user.profile;
    if (profile) {
      res.redirect('http://localhost:3000/');
    } else res.redirect('http://localhost:3000/failure');
  }
}
