import { NestFactory } from '@nestjs/core';
import { GlobalExceptionHandlerDemoModule } from './global-exception-handler-demo.module';
import { CustomExceptionFilter } from '../../../libs/exception-filter/src';

async function bootstrap() {
  const app = await NestFactory.create(GlobalExceptionHandlerDemoModule);
  app.useGlobalFilters(new CustomExceptionFilter());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
