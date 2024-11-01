import { Test, TestingModule } from '@nestjs/testing';
import { CacheableDemoController } from './cacheable-demo.controller';
import { CacheableDemoService } from './cacheable-demo.service';

describe('CacheableDemoController', () => {
  let cacheableDemoController: CacheableDemoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CacheableDemoController],
      providers: [CacheableDemoService],
    }).compile();

    cacheableDemoController = app.get<CacheableDemoController>(CacheableDemoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(cacheableDemoController.getHello()).toBe('Hello World!');
    });
  });
});
