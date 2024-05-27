import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class TestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    // console.log('context', context);

    return handler.handle().pipe(
      map((data: any) => {
        console.log('data', data);
      }),
    );
  }
}
