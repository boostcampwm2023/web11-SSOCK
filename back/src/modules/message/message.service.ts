import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  createMessage(createMessageDto: CreateMessageDto) {
    return createMessageDto;
  }
}
