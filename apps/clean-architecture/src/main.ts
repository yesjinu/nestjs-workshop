import { NestFactory } from '@nestjs/core';
import { CleanArchitectureModule } from './clean-architecture.module';

async function bootstrap() {
  const app = await NestFactory.create(CleanArchitectureModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
