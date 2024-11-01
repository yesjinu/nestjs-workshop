import { Injectable } from '@nestjs/common';
import { BadInputException } from '../../../libs/exception-filter/src';

@Injectable()
export class GlobalExceptionHandlerDemoService {
  getHello(): string {
    return 'Hello World!';
  }

  throwError() {
    throw new BadInputException('Your input is invalid');
  }
}
