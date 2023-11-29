import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './strategy/google-auth.strategy';
import { NaverAuthStrategy } from './strategy/naver-auth.strategy';
import { KakaoAuthStrategy } from './strategy/kakao-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { JWTGuard } from '../../common/guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PassportModule, JwtModule],
  providers: [
    GoogleAuthStrategy,
    NaverAuthStrategy,
    KakaoAuthStrategy,
    AuthService,
    JWTGuard
  ],
  controllers: [AuthController],
  exports: [JWTGuard]
})
export class AuthModule {}
