import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class hasJWTInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const cookies =
      request.headers.cookie?.split(';').map(cookie => cookie.trim()) ?? [];
    const accessToken = cookies.find(cookie =>
      cookie.startsWith(`access_token=`)
    );
    if (accessToken) {
      const token = accessToken.split('=')[1];
      request['hasToken'] = true;
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
      });

      request['user'] = payload;
    } else {
      request['user'] = null;
      request['hasToken'] = false;
    }

    return next.handle();
  }
}
