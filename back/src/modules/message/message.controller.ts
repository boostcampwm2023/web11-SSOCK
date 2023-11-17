import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { DeleteMessageDto } from './dto/delete-message.dto';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiOperation({
    summary: '메세지 생성 API',
    description: '스노우볼에 메세지를 생성합니다.'
  })
  @ApiBody({ type: CreateMessageDto })
  @ApiResponse({ status: 201, description: 'Created' })
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Delete(':message_id')
  @ApiOperation({
    summary: '메세지 삭제 API',
    description: '스노우볼에서 특정 메세지를 삭제합니다.'
  })
  @ApiBody({ type: DeleteMessageDto })
  @ApiResponse({ status: 204, description: 'No Content' })
  deleteMessage(@Param() deleteMessageDto: DeleteMessageDto) {
    this.messageService.deleteMessage(deleteMessageDto);
  }
}