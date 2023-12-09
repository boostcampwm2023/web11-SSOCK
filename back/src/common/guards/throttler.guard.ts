import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    console.log('req.ip = ', req.ip);
    console.log('req.ips = ', req.ips);
    const forwardedFor = req.headers['x-forwarded-for'];
    console.log('forwardedFor = ', forwardedFor);
    return req.ips.length ? req.ips[0] : req.ip;
  }
}
