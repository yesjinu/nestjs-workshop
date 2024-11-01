import { Test, TestingModule } from '@nestjs/testing';
import { CacheableDemoService } from './cacheable-demo.service';
import { CacheModule } from '../../../libs/cache/src';

describe('CacheableDemoService', () => {
  let service: CacheableDemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule],
      providers: [CacheableDemoService],
    }).compile();

    service = module.get<CacheableDemoService>(CacheableDemoService);
  });

  describe('getExpensiveData', () => {
    it('should cache data for 1 seconds', async () => {
      const result1 = await service.getRandomUUID();
      const result2 = await service.getRandomUUID();
      expect(result1).toBe(result2);

      // wait 500 ms, cache still valid
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result3 = await service.getRandomUUID();
      expect(result3).toBe(result1);

      await new Promise((resolve) => setTimeout(resolve, 500)); // 1 sec, cache expired
      const result4 = await service.getRandomUUID();
      expect(result4).not.toBe(result1); // Cache expired, counter should increment
    });
  });

  describe('evictRandomUUID', () => {
    it('should evict the cache', async () => {
      const result1 = await service.getRandomUUID();
      await service.evictRandomUUID();
      const result2 = await service.getRandomUUID();
      expect(result2).not.toBe(result1);
    });
  });
});
