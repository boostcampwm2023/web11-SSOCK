import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { IpService } from '../mongo/ip.service';

@Injectable()
export class IPLoggerInterceptor implements NestInterceptor {
  constructor(private readonly ipService: IpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.headers['x-forwarded-for'] || request.ip;
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(async data => {
        if (response.statusCode === HttpStatus.CREATED) {
          const id = data.id;
          await this.ipService.logIp(clientIp, id);
        }
        return data;
      })
    );
  }
}
