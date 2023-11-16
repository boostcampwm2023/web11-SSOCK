import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { SnowballModule } from './modules/snowball/snowball.module';
import typeOrmConfig from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, SnowballModule],
  controllers: [AppController, AuthController],
  providers: [AppService]
})
export class AppModule {}
