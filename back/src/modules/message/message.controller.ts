import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('write')
  @ApiResponse({
    description: '메세지 생성 API'
  })
  @ApiBody({ type: CreateMessageDto })
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }
}
