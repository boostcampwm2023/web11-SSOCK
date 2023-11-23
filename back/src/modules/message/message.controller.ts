import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Put
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import { ReqDeleteMessageDto } from './dto/request/req-delete-message.dto';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse
} from '@nestjs/swagger';
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';
import { MessageDto } from './dto/message.dto';
import { JWTGuard } from '../auth/auth.guard';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/:snowball_id')
  @HttpCode(201)
  @ApiOperation({
    summary: '메세지 생성 API',
    description: '스노우볼에 메세지를 생성합니다.'
  })
  @ApiBody({ type: ReqCreateMessageDto })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: ResCreateMessageDto
  })
  @ApiResponse({
    status: 500,
    description: 'Insert Fail'
  })
  async createMessage(
    @Param('snowball_id') snowball_id: number,
    @Body() createMessageDto: ReqCreateMessageDto
  ): Promise<ResCreateMessageDto> {
    const resCreateMessage = await this.messageService.createMessage(
      createMessageDto,
      snowball_id
    );
    return resCreateMessage;
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Delete(':message_id')
  @HttpCode(204)
  @ApiOperation({
    summary: '메세지 삭제 API',
    description: '스노우볼에서 특정 메세지를 삭제합니다.'
  })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({
    status: 500,
    description: 'Delete Fail'
  })
  async deleteMessage(@Param() deleteMessageDto: ReqDeleteMessageDto) {
    await this.messageService.deleteMessage(deleteMessageDto);
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Get('/:user_id')
  @HttpCode(200)
  @ApiOperation({
    summary: '메세지 조회 API',
    description: '모든 메세지를 조회합니다'
  })
  @ApiResponse({
    status: 200,
    type: MessageDto
  })
  @ApiResponse({
    status: 500,
    description: 'Find Fail'
  })
  async getAllMessages(
    @Param('user_id') user_id: number
  ): Promise<MessageDto[]> {
    const messages = await this.messageService.getAllMessages(user_id);
    return messages;
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Put('/open/:message_id')
  @HttpCode(200)
  @ApiOperation({
    summary: '메세지 오픈 처리',
    description: '메시지를 오픈 처리합니다.'
  })
  @ApiResponse({
    status: 200,
    type: MessageDto
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청입니다.'
  })
  @ApiNotFoundResponse({
    description: '해당 메시지가 존재하지 않습니다.'
  })
  @ApiConflictResponse({
    description: '이미 오픈된 메시지입니다.'
  })
  @ApiInternalServerErrorResponse({
    description: '서버측 오류'
  })
  async openMessage(
    @Param('message_id') message_id: number
  ): Promise<MessageDto> {
    return await this.messageService.openMessage(message_id);
  }
}
