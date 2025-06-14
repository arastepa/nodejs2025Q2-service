import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, query, body } = request;

    this.loggingService.log(
      `Incoming Request: URL: ${url}, Method: ${method}, Query: ${JSON.stringify(
        query,
      )}, Body: ${JSON.stringify(body)}`,
      'info',
    );

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;

        this.loggingService.log(
          `Response: URL: ${url}, Method: ${method}, Status Code: ${statusCode}, Duration: ${
            Date.now() - now
          }ms`,
          'info',
        );
      }),
    );
  }
}
