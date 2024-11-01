import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { SqliteCacheServiceImpl } from './sqlite.cache.service';

describe('CacheService', () => {
  let service: SqliteCacheServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CacheService,
          useClass: SqliteCacheServiceImpl,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService) as SqliteCacheServiceImpl;
    // Initialize the database
    await service.onModuleInit();
  });

  afterEach(async () => {
    // Clean up after each test
    await service.clearAll();
  });

  it('should set and get a value', async () => {
    await service.set('key', 'value', 60);
    expect(await service.get<string>('key')).toBe('value');
  });

  it('should return null for expired items', async () => {
    await service.set('key', 'value', 1);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(await service.get<string>('key')).toBeNull();
  });

  it('should delete all expired items', async () => {
    await service.set('key1', 'value1', 1);
    await service.set('key2', 'value2', 1);
    await service.set('key3', 'value3', 60);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    expect(await service.get<string>('key1')).toBeNull();
    expect(await service.get<string>('key2')).toBeNull();
    expect(await service.get<string>('key3')).toBe('value3');
  });

  it('should delete a value', async () => {
    await service.set('key', 'value', 60);
    await service.delete('key');
    expect(await service.get<string>('key')).toBeNull();
  });

  it('should clear all values', async () => {
    await service.set('key1', 'value1', 60);
    await service.set('key2', 'value2', 60);
    await service.clearAll();
    expect(await service.get<string>('key1')).toBeNull();
    expect(await service.get<string>('key2')).toBeNull();
  });
});
