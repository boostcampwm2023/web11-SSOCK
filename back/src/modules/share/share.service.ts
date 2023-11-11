import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateShareDto } from './dto/create-share.dto';

@Injectable()
export class ShareService {
  private readonly secretKey: string = 'secret_key'; // 암호화 키
  createShareLink(createShareDto: CreateShareDto): string {
    const dataToEncrypt = `${createShareDto.user_id}-${createShareDto.snowball_id}`;
    const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
    let encryptedLink = cipher.update(dataToEncrypt, 'utf-8', 'hex');
    encryptedLink += cipher.final('hex');
    return encryptedLink;
  }

  restoreShareLink(encryptedLink: string): string {
    const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
    let decryptedLink = decipher.update(encryptedLink, 'hex', 'utf-8');
    decryptedLink += decipher.final('utf-8');
    return decryptedLink;
  }
}
