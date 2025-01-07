import { Inject, Injectable } from '@nestjs/common';
import { Cacheable, CacheEvict, CacheService } from '../../../libs/cache/src';

@Injectable()
export class CacheableDemoService {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  /**
   * You can use the Cacheable decorator to cache the result of a method.
   */
  @Cacheable({ ttl: 1 }) // Cache for 1 seconds
  async getRandomUUID(): Promise<string> {
    return crypto.randomUUID();
  }

  /**
   * You can use the CacheEvict decorator to evict the cache of a method.
   */
  @CacheEvict({ methodNames: ['getRandomUUID'] })
  async evictRandomUUID() {}

  /**
   * You can use the CacheService directly to set and get cache.
   */
  async setCache(key: string, value: string) {
    await this.cacheService.set(key, value, 10);
  }

  async getCache(key: string): Promise<string | null> {
    return await this.cacheService.get(key);
  }
}
