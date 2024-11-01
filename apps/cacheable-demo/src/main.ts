import { NestFactory } from '@nestjs/core';
import { CacheableDemoModule } from './cacheable-demo.module';

async function bootstrap() {
  const app = await NestFactory.create(CacheableDemoModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
