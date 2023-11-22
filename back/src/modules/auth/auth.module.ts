import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './strategy/google-auth.strategy';
import { NaverAuthStrategy } from './strategy/naver-auth.strategy';
import { KakaoAuthStrategy } from './strategy/kakao-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '300s' }
    })
  ],
  providers: [
    GoogleAuthStrategy,
    NaverAuthStrategy,
    KakaoAuthStrategy,
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
