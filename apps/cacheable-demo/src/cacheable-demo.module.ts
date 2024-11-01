import { Module } from '@nestjs/common';
import { CacheableDemoService } from './cacheable-demo.service';
import { CacheModule } from '../../../libs/cache/src';

@Module({
  imports: [CacheModule],
  providers: [CacheableDemoService],
})
export class CacheableDemoModule {}
