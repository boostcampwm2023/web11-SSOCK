import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmConfig from './config/ormconfig';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
