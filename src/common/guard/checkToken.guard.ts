import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<any>();
    const tokenHeader = req.headers.token as string | undefined;
    console.log(tokenHeader);
    console.log('req.headers', req.headers);

    return true;
  }
}
