import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BaseException } from '../exceptions/base.exception';
import { UnCatchedException } from '../exceptions/custom.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const res =
      exception instanceof BaseException
        ? exception
        : new UnCatchedException((exception as HttpException).message);
    res.timestamp = new Date().toISOString();
    res.path = request.url;

    response.status(res.getStatus()).json({
      timestamp: res.timestamp,
      path: res.path,
      message: res.message,
      code: res.code,
      codeName: res.codeName,
      traceId: res.traceId,
      detail: res.detail,
    });
  }
}
