export interface CacheService {
  set<T>(key: string, value: T, ttl: number): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  getAll<T>(): Promise<Map<string, T>>;
  delete(key: string): Promise<void>;
  clearAll(): Promise<void>;
  cleanExpiredItems(): Promise<void>;
}

export const CacheService = Symbol('CacheService');
