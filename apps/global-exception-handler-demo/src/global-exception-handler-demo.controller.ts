import { Controller, Get } from '@nestjs/common';
import { GlobalExceptionHandlerDemoService } from './global-exception-handler-demo.service';

@Controller()
export class GlobalExceptionHandlerDemoController {
  constructor(
    private readonly globalExceptionHandlerDemoService: GlobalExceptionHandlerDemoService,
  ) {}

  @Get('throw-error')
  throwError() {
    return this.globalExceptionHandlerDemoService.throwError();
  }
}
