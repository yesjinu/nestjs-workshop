import { HttpException, HttpStatus } from '@nestjs/common';

interface IBaseException {
  timestamp: string; // "2024-01-01T00:00:00.000Z"
  path: string; // "/api/v1/auth/login"
  message: string; // "Your email or password is incorrect"
  code: string; // "40400"
  codeName: string; // "PASSWORD_OR_EMAIL_MISMATCH"
  detail?: any; // { email: "sample@test.com" }
  traceId?: string; // "123e4567-e89b-12d3-a456-426614174000"
}

export class BaseException extends HttpException implements IBaseException {
  timestamp: string;
  path: string;
  message: string;
  code: string;
  codeName: string;
  traceId?: string;
  detail?: any;

  constructor(_: {
    statusCode: HttpStatus;
    message: string;
    code: string;
    codeName: string;
    detail?: string;
  }) {
    const { statusCode, message, code, codeName, detail } = _;
    super(message, statusCode);
    this.code = code;
    this.codeName = codeName;
    this.detail = detail;
    this.traceId = crypto.randomUUID(); // FIXME: Get from AsyncLocalStorage
  }
}
