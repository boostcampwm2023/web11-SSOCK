import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';

@Injectable()
export class MessageService {
  createMessage(createMessageDto: CreateMessageDto) {
    return createMessageDto;
  }
  deleteMessage(deleteMessageDto: DeleteMessageDto) {
    return deleteMessageDto;
  }
}
