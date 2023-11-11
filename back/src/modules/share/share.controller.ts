import { Controller, Post, Get, Body } from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create-share.dto';
import { RestoreShareDto } from './dto/restore-share.dto';
import { ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Share API')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('create')
  @ApiOperation({
    summary: '링크 생성 API',
    description: '암호화된 링크를 생성합니다.'
  })
  @ApiBody({ type: CreateShareDto })
  createShareLink(@Body() createShareDto: CreateShareDto) {
    const encryptedLink = this.shareService.createShareLink(createShareDto);
    return { encryptedLink };
  }

  @Get('restore')
  @ApiOperation({
    summary: '링크 복원 API',
    description: '암호화된 링크를 복원해 접속가능한 링크를 생성합니다.'
  })
  @ApiBody({ type: RestoreShareDto })
  restoreShareLink(@Body() restoreShareDto: RestoreShareDto) {
    const decryptedLink = this.shareService.restoreShareLink(
      restoreShareDto.encrypted_link
    );
    return { decryptedLink };
  }
}
