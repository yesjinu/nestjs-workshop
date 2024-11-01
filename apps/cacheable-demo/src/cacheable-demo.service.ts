import { Injectable } from '@nestjs/common';
import { Cacheable, CacheEvict, CacheService } from '../../../libs/cache/src';

@Injectable()
export class CacheableDemoService {
  constructor(private readonly cacheService: CacheService) {}

  @Cacheable({ ttl: 30 }) // Cache for 30 seconds
  async getRandomUUID(): Promise<string> {
    return crypto.randomUUID();
  }

  @CacheEvict({ methodNames: ['getRandomUUID'] })
  async evictRandomUUID() {}
}
