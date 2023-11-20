import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageEntity } from './entity/message.entity';
import { UserEntity } from '../snowball/entity/user.entity';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SnowballEntity, MessageEntity])
  ],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
