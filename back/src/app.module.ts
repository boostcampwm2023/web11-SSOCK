import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MessageModule } from './modules/message/message.module';
import { ShareModule } from './modules/share/share.module';
import typeOrmConfig from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ShareModule,
    AuthModule,
    MessageModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService]
})
export class AppModule {}
