import { Logger } from '@nestjs/common';
import { CacheService } from './cache.service';

/**
 * Cacheable decorator
 * @example @Cacheable({ ttl: 60 }) -> caches the result for 60 seconds
 * @example cacheKey looks like: `MyClass:myMethod:["arg1","arg2"]`
 */
export function Cacheable(_: { ttl: number }) {
  const { ttl } = _;
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = (this as any).cacheService;
      if (!cacheService) {
        throw new Error(`CacheService must be injected to use @Cacheable`);
      }

      const cacheKey = `${className}:${propertyKey}:${JSON.stringify(args)}`;
      const cachedResult = await cacheService.get(cacheKey);

      if (cachedResult !== null) {
        Logger.debug(
          `Cache hit: ${cacheKey} to ${JSON.stringify(cachedResult)}`,
        );
        return cachedResult;
      }

      Logger.debug(`Cache miss: ${cacheKey}`);
      const result = await originalMethod.apply(this, args);
      await cacheService.set(cacheKey, result, ttl);
      return result;
    };

    return descriptor;
  };
}

type CacheEvictOptions = {
  methodNames?: string[];
};

/**
 * CacheEvict decorator
 * @example @CacheEvict({ methodNames: ['findByToken'] }) -> evicts cache for specified methods
 */
export function CacheEvict(options: CacheEvictOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
      const cacheService: CacheService = (this as any).cacheService;
      if (!cacheService) {
        throw new Error(`CacheService must be injected to use @CacheEvict`);
      }

      const result = await originalMethod.apply(this, args);

      if (options.methodNames && options.methodNames.length > 0) {
        options.methodNames.forEach((methodName) => {
          const cacheKey = `${className}:${methodName}:${JSON.stringify(args)}`;
          cacheService.delete(cacheKey);
        });
      }

      return result;
    };

    return descriptor;
  };
}
