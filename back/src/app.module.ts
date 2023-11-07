import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService]
})
export class AppModule {}
