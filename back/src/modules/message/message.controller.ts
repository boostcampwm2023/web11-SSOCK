import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  UseGuards,
  Put,
  Req
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ReqCreateMessageDto } from './dto/request/req-create-message.dto';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiGoneResponse,
  ApiUnauthorizedResponse
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
  @ApiResponse({
    status: 204,
    description: '해당 메시지가 성공적으로 지워졌음'
  })
  @ApiGoneResponse({
    description: '이미 삭제된 메시지입니다.'
  })
  @ApiUnauthorizedResponse({
    description: '로그인이 필요합니다.'
  })
  async deleteMessage(
    @Req() req: any,
    @Param('message_id') message_id: number
  ) {
    await this.messageService.deleteMessage(req.user, message_id);
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    summary: '메세지 조회 API',
    description:
      '모든 메세지를 조회합니다. JWT 토큰안에 user_id를 이용해 조회합니다.'
  })
  @ApiResponse({
    status: 200,
    type: [MessageDto]
  })
  @ApiResponse({
    status: 500,
    description: 'Find Fail'
  })
  async getAllMessages(@Req() req: any): Promise<MessageDto[]> {
    const messages = await this.messageService.getAllMessages(req.user);
    return messages;
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Put('/:message_id/open')
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
