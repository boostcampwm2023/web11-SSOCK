import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [GoogleAuthService],
  controllers: [AuthController]
})
export class AuthModule {}
