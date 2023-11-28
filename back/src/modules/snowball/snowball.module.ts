import { Module } from '@nestjs/common';
import { SnowballController } from './snowball.controller';
import { SnowballService } from './snowball.service';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { JWTGuard } from '../auth/auth.guard';
import { MessageEntity } from '../message/entity/message.entity';
import { MessageService } from '../message/message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SnowballEntity, MessageEntity]),
    MessageModule
  ],
  controllers: [SnowballController],
  providers: [SnowballService, MessageService, JWTGuard],
  exports: [SnowballService, MessageService, TypeOrmModule]
})
export class SnowballModule {}
