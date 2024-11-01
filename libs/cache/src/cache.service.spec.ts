import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should set and get a value', () => {
    service.set('key', 'value', 60);
    expect(service.get('key')).toBe('value');
  });

  it('should return null for expired items', async () => {
    service.set('key', 'value', 1);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(service.get('key')).toBeNull();
  });

  it('should delete all expired items', async () => {
    service.set('key1', 'value1', 1);
    service.set('key2', 'value2', 1);
    service.set('key3', 'value3', 60);

    await new Promise((resolve) => setTimeout(resolve, 1100));

    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
    expect(service.get('key3')).toBe('value3');
  });

  it('should delete a value', () => {
    service.set('key', 'value', 60);
    service.delete('key');
    expect(service.get('key')).toBeNull();
  });

  it('should clear all values', () => {
    service.set('key1', 'value1', 60);
    service.set('key2', 'value2', 60);
    service.clear();
    expect(service.get('key1')).toBeNull();
    expect(service.get('key2')).toBeNull();
  });
});
