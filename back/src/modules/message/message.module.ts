import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageEntity } from './entity/message.entity';
import { JWTGuard } from '../../common/guards/jwt.guard';
import { ClovaService } from './clova.service';
import { LetterEntity } from './entity/letter.entity';
import { SnowballEntity } from '../snowball/entity/snowball.entity';
import { DecorationPrefixEntity } from '../snowball/entity/decoration-prefix.entity';
import { UserEntity } from '../user/entity/user.entity';
import { IpService } from 'src/common/mongo/ip.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IPSchema } from 'src/common/mongo/ip.schema';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MessageEntity,
      SnowballEntity,
      UserEntity,
      LetterEntity,
      DecorationPrefixEntity
    ]),
    MongooseModule.forFeature([{ name: 'Ip', schema: IPSchema }])
  ],
  controllers: [MessageController],
  providers: [MessageService, ClovaService, JWTGuard, IpService],
  exports: [MessageService, TypeOrmModule]
})
export class MessageModule {}
