import { Inject, Injectable } from '@nestjs/common';
import { Cacheable, CacheEvict, CacheService } from '../../../libs/cache/src';

@Injectable()
export class CacheableDemoService {
  constructor(
    @Inject(CacheService) private readonly cacheService: CacheService,
  ) {}

  @Cacheable({ ttl: 1 }) // Cache for 1 seconds
  async getRandomUUID(): Promise<string> {
    return crypto.randomUUID();
  }

  @CacheEvict({ methodNames: ['getRandomUUID'] })
  async evictRandomUUID() {}
}
