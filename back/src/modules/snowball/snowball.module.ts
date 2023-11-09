import { Module } from '@nestjs/common';
import { SnowballController } from './snowball.controller';
import { SnowballService } from './snowball.service';

@Module({
  controllers: [SnowballController],
  providers: [SnowballService]
})
export class SnowballModule {}
