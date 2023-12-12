import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
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
    const message = request.body.content;
    const logData = {
      level: 'info',
      clientIp,
      message,
      timestamp: new Date().toISOString()
    };

    this.logger.info(logData);
    return next.handle();
  }
}
