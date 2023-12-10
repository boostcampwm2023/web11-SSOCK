import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const client_ip = req.headers['x-forwarded-for'];
    console.log('client_ip = ', client_ip);
    return client_ip || req.ip;
  }
}
