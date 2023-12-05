import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ControllerLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controllerName = context.getClass().name;
    const logger = new Logger(controllerName);
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const start = Date.now();
    logger.verbose(`>>> IN: ${method} ${url}`);
    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        logger.verbose(`<<< OUT: ${method} ${url} ${end - start}ms`);
      })
    );
  }
}
