import { Controller, Get } from '@nestjs/common';
import { CacheableDemoService } from './cacheable-demo.service';

@Controller()
export class CacheableDemoController {
  constructor(private readonly cacheableDemoService: CacheableDemoService) {}

  @Get()
  getHello(): string {
    return this.cacheableDemoService.getHello();
  }
}
