import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const token = this.extractAccessToken(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractAccessToken(@Req() req: Request): string | undefined {
    const cookieHeader = req.headers.cookie;
    console.log(cookieHeader);
    if (!cookieHeader) {
      return undefined;
    }

    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const accessToken = cookies.find(cookie =>
      cookie.startsWith(`access_token=`)
    );

    if (accessToken) {
      return accessToken.split('=')[1];
    } else {
      throw new TokenExpiredError('Token expired', new Date());
    }
  }
}
