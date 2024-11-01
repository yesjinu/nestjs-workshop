import { Injectable, OnModuleInit } from '@nestjs/common';
import { CacheService } from '../cache.service';
import * as sqlite3 from 'better-sqlite3';

@Injectable()
export class SqliteCacheServiceImpl implements CacheService, OnModuleInit {
  private db: any;

  onModuleInit() {
    this.db = new sqlite3('cache.db');
    this.db
      .prepare(
        `
      CREATE TABLE IF NOT EXISTS cache (
        key TEXT PRIMARY KEY,
        value TEXT,
        ttl INTEGER
      )
    `,
      )
      .run();
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    const expiresAt = Date.now() + ttl * 1000;
    const stmt = this.db.prepare(`
      INSERT INTO cache (key, value, ttl) VALUES (?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET value = ?, ttl = ?
    `);
    stmt.run(
      key,
      JSON.stringify(value),
      expiresAt,
      JSON.stringify(value),
      expiresAt,
    );
  }

  async get<T>(key: string): Promise<T | null> {
    const stmt = this.db.prepare(`SELECT value, ttl FROM cache WHERE key = ?`);
    const row = stmt.get(key);
    if (row && row.ttl > Date.now()) {
      return JSON.parse(row.value);
    }
    return null;
  }

  async getAll<T>(): Promise<Map<string, T>> {
    const stmt = this.db.prepare(`SELECT key, value, ttl FROM cache`);
    const rows = stmt.all();
    const result = new Map<string, T>();
    rows.forEach((row) => {
      if (row.ttl > Date.now()) {
        result.set(row.key, JSON.parse(row.value));
      }
    });
    return result;
  }

  async delete(key: string): Promise<void> {
    const stmt = this.db.prepare(`DELETE FROM cache WHERE key = ?`);
    stmt.run(key);
  }

  async clearAll(): Promise<void> {
    const stmt = this.db.prepare(`DELETE FROM cache`);
    stmt.run();
  }

  async cleanExpiredItems(): Promise<void> {
    const stmt = this.db.prepare(`DELETE FROM cache WHERE ttl <= ?`);
    stmt.run(Date.now());
  }
}
