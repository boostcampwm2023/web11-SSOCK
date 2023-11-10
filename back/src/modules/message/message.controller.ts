import { Controller, Post, Delete, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  @ApiResponse({
    description: '메세지 생성 API'
  })
  @ApiBody({ type: CreateMessageDto })
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete('delete')
  @ApiResponse({
    description: '메세지 삭제 API'
  })
  @ApiBody({ type: DeleteMessageDto })
  deleteMessage(@Body() deleteMessageDto: DeleteMessageDto) {
    return this.messageService.deleteMessage(deleteMessageDto);
  }
}
