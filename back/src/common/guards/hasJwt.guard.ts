import { CanActivate, ExecutionContext, Injectable, Req } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class hasJWTGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      request['hasToken'] = false;
    } else {
      request['hasToken'] = true;
    }
    return true;
  }

  private extractTokenFromHeader(@Req() req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// 인터셉터, class-trasformer로 변경
