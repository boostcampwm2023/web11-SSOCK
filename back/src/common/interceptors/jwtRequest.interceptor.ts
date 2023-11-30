import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWTToRequestInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    console.log('Before...');

    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      request['hasToken'] = true;
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET
      });

      request['user'] = payload;
    } else {
      request['hasToken'] = false;
    }

    return next.handle();
  }
}
