import { Test, TestingModule } from '@nestjs/testing';
import { Cacheable, CacheEvict } from './cache.decorator';
import { CacheService } from './cache.service';

describe('Cacheable Decorator', () => {
  let cacheService: CacheService;

  class TestClass {
    constructor(public cacheService: CacheService) {}

    @Cacheable({ ttl: 1 })
    async save(arg: string): Promise<string> {
      return `Result for ${arg}`;
    }

    @CacheEvict({ methodNames: ['save'] })
    async delete(arg: string): Promise<void> {
      // delete operation
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    cacheService = module.get<CacheService>(CacheService);
  });

  it('should throw error if CacheService is not injected', async () => {
    const testInstance = new TestClass(null);
    await expect(testInstance.save('test')).rejects.toThrow(Error);
  });

  it('should cache method results', async () => {
    const testInstance = new TestClass(cacheService);
    const cacheSetSpy = jest.spyOn(cacheService, 'set');

    const ARG1 = 'arg1';
    const ARG2 = 'arg2';
    const result1 = await testInstance.save(ARG1);
    expect(result1).toBe(`Result for ${ARG1}`);
    expect(cacheSetSpy).toHaveBeenCalledTimes(1);

    const result2 = await testInstance.save(ARG1);
    expect(result2).toBe(`Result for ${ARG1}`);
    expect(cacheSetSpy).toHaveBeenCalledTimes(1); // Still called only once

    const result3 = await testInstance.save(ARG2);
    expect(result3).toBe(`Result for ${ARG2}`);
    expect(cacheSetSpy).toHaveBeenCalledTimes(2);
  });

  it('should cache method for specified time', async () => {
    const testInstance = new TestClass(cacheService);
    const cacheSetSpy = jest.spyOn(cacheService, 'set');

    const ARG = 'arg';
    const result1 = await testInstance.save(ARG);
    expect(result1).toBe(`Result for ${ARG}`);
    expect(cacheSetSpy).toHaveBeenCalledTimes(1);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const result2 = await testInstance.save(ARG);
    expect(result2).toBe(`Result for ${ARG}`);
    expect(cacheSetSpy).toHaveBeenCalledTimes(2);
  });

  it('should throw error if CacheService is not injected', async () => {
    const testInstance = new TestClass(null);
    await expect(testInstance.save('test')).rejects.toThrow(Error);
  });

  it('should evict cache', async () => {
    const testInstance = new TestClass(cacheService);

    await testInstance.save('test');
    expect(cacheService.getAll().get('TestClass:save:["test"]')).toBeDefined();
    await testInstance.delete('test');
    expect(
      cacheService.getAll().get('TestClass:save:["test"]'),
    ).toBeUndefined();
    await testInstance.save('test');
    expect(cacheService.getAll().get('TestClass:save:["test"]')).toBeDefined();
  });

  it('should not evict other methods cache', async () => {
    const testInstance = new TestClass(cacheService);

    await testInstance.save('test');
    await testInstance.save('test2');
    await testInstance.delete('test');
    expect(
      cacheService.getAll().get('TestClass:save:["test"]'),
    ).toBeUndefined();
    expect(cacheService.getAll().get('TestClass:save:["test2"]')).toBeDefined();
  });
});
