import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './strategy/google-auth.strategy';
import { NaverAuthStrategy } from './strategy/naver-auth.strategy';
import { KakaoAuthStrategy } from './strategy/kakao-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SnowballService } from '../snowball/snowball.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { UserEntity } from './entity/user.entity';
import { SnowballDecorationEntity } from '../snowball/entity/snowball-decoration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnowballEntity,
      UserEntity,
      SnowballDecorationEntity
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' }
    })
  ],
  providers: [
    GoogleAuthStrategy,
    NaverAuthStrategy,
    KakaoAuthStrategy,
    AuthService,
    SnowballService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
