import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistExceptions extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.CONFLICT,
    );
  }
}

export class FailedValidatorException extends HttpException {
  constructor(fails: any[]) {
    const message = 'Validation failed';
    const errors = fails.map((fail) => {
      const key = Object.keys(fail)[0];
      return {
        field: key,
        message: fail[key],
      };
    });

    super(
      {
        success: false,
        message,
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class DoesNotExistException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(
      {
        success: false,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
