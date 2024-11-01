import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache.service';

interface CacheItem<T> {
  value: T;
  expiry: number;
}

@Injectable()
export class InMemoryCacheServiceImpl implements CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();

  /**
   * Set cache item with ttl.
   * @param ttl unit: seconds
   */
  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    if (!value) return;
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiry });
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      setImmediate(() => this.cleanExpiredItems());
      return null;
    }
    return item.value as T;
  }

  async getAll<T>(): Promise<Map<string, T>> {
    return this.cache as Map<string, T>;
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clearAll(): Promise<void> {
    this.cache.clear();
  }

  async cleanExpiredItems(): Promise<void> {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}
