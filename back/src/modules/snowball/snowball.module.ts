import { Module } from '@nestjs/common';
import { SnowballController } from './snowball.controller';
import { SnowballService } from './snowball.service';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from './entity/snowball.entity';
import { MessageEntity } from '../message/entity/message.entity';
import { SnowballDecorationEntity } from './entity/snowball-decoration.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SnowballEntity,
      MessageEntity,
      SnowballDecorationEntity
    ]),
    MessageModule,
    AuthModule
  ],
  controllers: [SnowballController],
  providers: [SnowballService]
})
export class SnowballModule {}
