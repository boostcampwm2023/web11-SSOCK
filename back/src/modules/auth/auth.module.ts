import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './google-auth.strategy';
import { NaverAuthStrategy } from './naver-auth.strategy';
import { KakaoAuthStrategy } from './kakao-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [
    GoogleAuthStrategy,
    NaverAuthStrategy,
    KakaoAuthStrategy,
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
