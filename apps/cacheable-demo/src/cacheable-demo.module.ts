import { Module } from '@nestjs/common';
import { CacheableDemoController } from './cacheable-demo.controller';
import { CacheableDemoService } from './cacheable-demo.service';

@Module({
  imports: [],
  controllers: [CacheableDemoController],
  providers: [CacheableDemoService],
})
export class CacheableDemoModule {}
