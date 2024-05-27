import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TokenValidatorPipe implements PipeTransform {
  transform(request: any) {
    console.log('request', request);
    // you can use request, request.query, request.params, request.headers, ...
    return request;
  }
}
