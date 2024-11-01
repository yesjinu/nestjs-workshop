import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheableDemoService {
  getHello(): string {
    return 'Hello World!';
  }
}
