import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('READ COMMITTED');

    req.queryRunnerManager = queryRunner.manager;

    return next.handle().pipe(
      map(async data => {
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return data;
      }),
      catchError(async err => {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();

        throw err;
      })
    );
  }
}
