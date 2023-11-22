import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../auth/entity/user.entity';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SnowballEntity, MessageEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' }
    }),
    AuthModule
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
