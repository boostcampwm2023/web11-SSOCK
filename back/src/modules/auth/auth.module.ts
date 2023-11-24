import { Module } from '@nestjs/common';
import { GoogleAuthStrategy } from './strategy/google-auth.strategy';
import { NaverAuthStrategy } from './strategy/naver-auth.strategy';
import { KakaoAuthStrategy } from './strategy/kakao-auth.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SnowballService } from '../snowball/snowball.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { UserEntity } from './entity/user.entity';
import { JWTGuard } from './auth.guard';
import { MessageEntity } from '../message/entity/message.entity';
import { SnowballDecorationEntity } from '../snowball/entity/snowball-decoration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      SnowballEntity,
      SnowballDecorationEntity,
      MessageEntity
    ]),
    PassportModule
  ],
  providers: [
    GoogleAuthStrategy,
    NaverAuthStrategy,
    KakaoAuthStrategy,
    AuthService,
    SnowballService,
    JWTGuard
  ],
  controllers: [AuthController],
  exports: [JWTGuard]
})
export class AuthModule {}
