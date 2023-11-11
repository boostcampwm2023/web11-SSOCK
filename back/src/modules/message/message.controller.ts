import { Controller, Post, Delete, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('create')
  @ApiOperation({
    summary: '메세지 생성 API',
    description: '스노우볼에 메세지를 생성합니다.'
  })
  @ApiBody({ type: CreateMessageDto })
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete('delete')
  @ApiOperation({
    summary: '메세지 삭제 API',
    description: '스노우볼에서 특정 메세지를 삭제합니다.'
  })
  @ApiBody({ type: DeleteMessageDto })
  deleteMessage(@Body() deleteMessageDto: DeleteMessageDto) {
    return this.messageService.deleteMessage(deleteMessageDto);
  }
}
