import { Module } from '@nestjs/common';
import { GlobalExceptionHandlerDemoController } from './global-exception-handler-demo.controller';
import { GlobalExceptionHandlerDemoService } from './global-exception-handler-demo.service';

@Module({
  imports: [],
  controllers: [GlobalExceptionHandlerDemoController],
  providers: [GlobalExceptionHandlerDemoService],
})
export class GlobalExceptionHandlerDemoModule {}
