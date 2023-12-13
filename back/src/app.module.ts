import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import typeOrmConfig from './config/orm-config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ControllerLoggerInterceptor } from './common/interceptors/log.interceptor';
import { ThrottlerModule } from '@nestjs/throttler';
import throttlerConfig from './config/throttler-config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ThrottlerModule.forRoot(throttlerConfig),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ControllerLoggerInterceptor },
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard }
  ]
})
export class AppModule {}
