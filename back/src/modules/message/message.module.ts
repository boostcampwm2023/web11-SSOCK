import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageEntity } from './entity/message.entity';
import { JWTGuard } from '../../common/guards/jwt.guard';
@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService, JWTGuard],
  exports: [MessageService, TypeOrmModule]
})
export class MessageModule {}
