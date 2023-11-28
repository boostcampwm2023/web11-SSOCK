import {
  Controller,
  Get,
  Body,
  UseGuards,
  Param,
  Req,
  Put
} from '@nestjs/common';
import { JWTGuard } from '../auth/auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { ResInfoDto } from './dto/response/res-info.dto';
import { NicknameDto } from './dto/nickname.dto';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Get()
  @ApiOperation({
    summary: '사용자 유저 조회 API',
    description: '사용자가 접속한 유저의 정보를 반환합니다'
  })
  @ApiResponse({
    status: 200,
    type: ResInfoDto
  })
  async createUserInfo(@Req() req: any): Promise<ResInfoDto> {
    const result = this.userService.createUserInfo(req);
    return result;
  }

  @Get('/:user_id')
  @ApiOperation({
    summary: '방문자 유저 조회 API',
    description: '방문자가 접속한 유저의 정보를 반환합니다'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    type: ResInfoDto
  })
  async createVisitInfo(
    @Param('user_id') user_id: string
  ): Promise<ResInfoDto> {
    const user_pk = this.userService.getUserPk(user_id);
    const result = this.userService.createUserInfo(user_pk);
    return result;
  }

  @UseGuards(JWTGuard)
  @ApiBearerAuth('jwt-token')
  @Put('/nickname')
  @ApiBody({ type: NicknameDto })
  @ApiOperation({
    summary: '사용자 닉네임 변경 API',
    description: '사용자가 닉네임을 변경합니다'
  })
  @ApiResponse({
    status: 200,
    description: '변경된 닉네임',
    type: NicknameDto
  })
  async updateNickname(
    @Req() req: any,
    @Body() nickname: string
  ): Promise<NicknameDto> {
    const result = this.userService.updateNickname(req.id, nickname);
    return result;
  }
}
