import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './google-auth.strategy';
import { NaverAuthStrategy } from './naver-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [GoogleAuthStrategy, NaverAuthStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
