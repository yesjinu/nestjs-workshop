import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ExceptionCode } from './enum.exception';

export class BadInputException extends BaseException {
  constructor(message: string, detail?: string) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: message ?? 'Your input is invalid',
      code: ExceptionCode.BAD_INPUT,
      codeName: 'BAD_INPUT',
      detail,
    });
  }
}

/**
 * This exception is thrown when the user is not found in the database.
 */
export class UnCatchedException extends BaseException {
  constructor(message?: string) {
    super({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message ?? 'Internal server error',
      code: ExceptionCode.UNCAUGHT_EXCEPTION,
      codeName: 'UNCAUGHT_EXCEPTION',
    });
  }
}
