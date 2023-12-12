import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class IPLoggerInterceptor implements NestInterceptor {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new DailyRotateFile({
          filename: '../ip-log/%DATE%.json',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxSize: '20m',
          maxFiles: '365d'
        })
      ]
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const clientIp = request.headers['x-forwarded-for'] || request.ip;
    const logData = {
      level: 'info',
      clientIp
    };

    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map(data => {
        if (response.statusCode === HttpStatus.CREATED) {
          const id = data.id;
          this.logger.info({ ...logData, id });
        }
        return data;
      })
    );
  }
}
