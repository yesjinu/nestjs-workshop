import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { InMemoryCacheServiceImpl } from './adapter/in-memory.cache.service';
import { SqliteCacheServiceImpl } from './adapter/sqlite.cache.service';
@Module({
  providers: [
    {
      provide: CacheService,
      // useClass: SqliteCacheServiceImpl,
      useClass: InMemoryCacheServiceImpl,
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
