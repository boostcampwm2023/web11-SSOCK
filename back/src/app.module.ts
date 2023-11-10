import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MessageController } from './modules/message/message.controller';
import { MessageModule } from './modules/message/message.module';
import { MessageService } from './modules/message/message.service';

@Module({
  imports: [AuthModule, MessageModule],
  controllers: [AppController, AuthController, MessageController],
  providers: [AppService, MessageService]
})
export class AppModule {}
