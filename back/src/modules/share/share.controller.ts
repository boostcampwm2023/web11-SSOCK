import { Controller, Post, Get, Body } from '@nestjs/common';
import { ShareService } from './share.service';
import { CreateShareDto } from './dto/create-share.dto';
import { RestoreShareDto } from './dto/restore-share.dto';
import { ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Share API')
@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('create')
  @ApiResponse({
    description: '링크 생성 API'
  })
  @ApiBody({ type: CreateShareDto })
  createShareLink(@Body() createShareDto: CreateShareDto) {
    const encryptedLink = this.shareService.createShareLink(createShareDto);
    return { encryptedLink };
  }

  @Get('restore')
  @ApiResponse({
    description: '링크 복원 API'
  })
  @ApiBody({ type: RestoreShareDto })
  restoreShareLink(@Body() restoreShareDto: RestoreShareDto) {
    const decryptedLink = this.shareService.restoreShareLink(
      restoreShareDto.encrypted_link
    );
    return { decryptedLink };
  }
}
