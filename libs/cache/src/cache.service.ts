import { Injectable } from '@nestjs/common';

interface CacheItem<T> {
  value: T;
  expiry: number;
}

@Injectable()
export class CacheService {
  private cache: Map<string, CacheItem<any>> = new Map();

  /**
   * Set cache item with ttl.
   * @param ttl unit: seconds
   */
  set<T>(key: string, value: T, ttl: number): void {
    if (!value) return;
    const expiry = Date.now() + ttl * 1000;
    this.cache.set(key, { value, expiry });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      setImmediate(() => this.cleanExpiredItems());
      return null;
    }
    return item.value as T;
  }

  getAll<T>(): Map<string, CacheItem<T>> {
    return this.cache;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanExpiredItems(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}
