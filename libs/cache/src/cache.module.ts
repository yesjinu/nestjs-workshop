import { Module } from '@nestjs/common';
import { InMemoryCacheServiceImpl } from './adapter/in-memory.cache.service';
import { CacheService } from './cache.service';
@Module({
  providers: [
    {
      provide: CacheService,
      useClass: InMemoryCacheServiceImpl,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
