import { Test, TestingModule } from '@nestjs/testing';
import { CacheableDemoController } from './cacheable-demo.controller';
import { CacheableDemoService } from './cacheable-demo.service';
import { CacheModule } from '../../../libs/cache/src/cache.module';

describe('CacheableDemoController', () => {
  let controller: CacheableDemoController;
  let service: CacheableDemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule],
      controllers: [CacheableDemoController],
      providers: [
        {
          provide: CacheableDemoService,
          useValue: {
            getExpensiveData: jest.fn(),
            getUserData: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CacheableDemoController>(CacheableDemoController);
    service = module.get<CacheableDemoService>(CacheableDemoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getExpensiveData', () => {
    it('should return expensive data', async () => {
      const expectedResult = {
        data: 'Some expensive data',
        timestamp: new Date().toISOString(),
        counter: 1,
      };

      jest.spyOn(service, 'getExpensiveData').mockResolvedValue(expectedResult);

      const result = await controller.getExpensiveData();
      expect(result).toEqual(expectedResult);
      expect(service.getExpensiveData).toHaveBeenCalled();
    });
  });

  describe('getUserData', () => {
    it('should return user data for given userId', async () => {
      const userId = '123';
      const expectedResult = {
        userId,
        name: `User ${userId}`,
        lastAccessed: new Date().toISOString(),
      };

      jest.spyOn(service, 'getUserData').mockResolvedValue(expectedResult);

      const result = await controller.getUserData(userId);
      expect(result).toEqual(expectedResult);
      expect(service.getUserData).toHaveBeenCalledWith(userId);
    });
  });
});
