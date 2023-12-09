import { ThrottlerGuard } from '@nestjs/throttler';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = await this.getTracker(request);
    console.log(ip);
    return true;
  }

  protected async getTracker(req: Record<string, any>): Promise<string> {
    console.log('req.ip = ', req.ip);
    console.log('req.ips = ', req.ips);
    return req.ips.length ? req.ips[0] : req.ip;
  }
}
