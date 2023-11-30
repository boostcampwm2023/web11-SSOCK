import { Module, forwardRef } from '@nestjs/common';
import { SnowballController } from './snowball.controller';
import { SnowballService } from './snowball.service';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { JWTGuard } from '../../common/guards/jwt.guard';
import { hasJWTGuard } from 'src/common/guards/hasJwt.guard';
import { MessageEntity } from '../message/entity/message.entity';
import { MessageService } from '../message/message.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SnowballEntity, MessageEntity]),
    MessageModule,
    forwardRef(() => UserModule)
  ],
  controllers: [SnowballController],
  providers: [SnowballService, MessageService, JWTGuard, hasJWTGuard],
  exports: [SnowballService, MessageService, TypeOrmModule]
})
export class SnowballModule {}
