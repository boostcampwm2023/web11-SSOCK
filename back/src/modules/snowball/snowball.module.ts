import { Module } from '@nestjs/common';
import { SnowballController } from './snowball.controller';
import { SnowballService } from './snowball.service';
import { MessageModule } from '../message/message.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnowballEntity } from './entity/snowball.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SnowballEntity]), MessageModule],
  controllers: [SnowballController],
  providers: [SnowballService]
})
export class SnowballModule {}
