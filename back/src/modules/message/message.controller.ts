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
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiGoneResponse,
  ApiUnauthorizedResponse,
  ApiCookieAuth
} from '@nestjs/swagger';
import { ResCreateMessageDto } from './dto/response/res-create-message.dto';
import { MessageDto } from './dto/message.dto';
import { JWTGuard } from 'src/common/guards/jwt.guard';
import { JWTRequest } from 'src/common/interface/request.interface';
import { ClovaService } from './clova.service';
import { UpdateMessageLocationsDto } from './dto/update-message-locations.dto';
//import { Throttle } from '@nestjs/throttler';

@ApiTags('Message API')
@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly clovaService: ClovaService
  ) {}

  @Post('/:auth_id/:snowball_id')
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
    @Param('auth_id') auth_id: string,
    @Param('snowball_id') snowball_id: number,
    @Body() createMessageDto: ReqCreateMessageDto
  ): Promise<ResCreateMessageDto> {
    const resClovaSentiment = await this.clovaService.analyze(
      createMessageDto.content
    );
    const resCreateMessage = await this.messageService.createMessage(
      createMessageDto,
      resClovaSentiment,
      auth_id,
      snowball_id
    );
    return resCreateMessage;
  }

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
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
    @Req() req: JWTRequest,
    @Param('message_id') message_id: number
  ) {
    await this.messageService.deleteMessage(req.user.id, message_id);
  }

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
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
  async getAllMessages(@Req() req: JWTRequest): Promise<MessageDto[]> {
    const messages = await this.messageService.getAllMessages(req.user.id);
    return messages;
  }

  @UseGuards(JWTGuard)
  //@Throttle({ api: { limit: 10, ttl: 1000 } })
  @ApiCookieAuth('access_token')
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

  @UseGuards(JWTGuard)
  @ApiCookieAuth('access_token')
  @Put('/location')
  @ApiOperation({
    summary: '메세지 위치 변경',
    description: '메시지의 위치를 변경합니다.'
  })
  @ApiResponse({
    status: 200,
    type: UpdateMessageLocationsDto
  })
  @ApiBadRequestResponse({
    description: '잘못된 요청입니다.'
  })
  @ApiNotFoundResponse({
    description: '해당 메시지가 존재하지 않습니다.'
  })
  @ApiInternalServerErrorResponse({
    description: '서버측 오류'
  })
  @ApiConflictResponse({
    description: '목표 위치가 비어있지 않습니다.'
  })
  async updateMessageLocation(
    @Body() updateDtos: UpdateMessageLocationsDto
  ): Promise<UpdateMessageLocationsDto> {
    return await this.messageService.updateMessageLocations(updateDtos);
  }
}
