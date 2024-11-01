import { Controller, Get, Param } from '@nestjs/common';
import { CacheableDemoService } from './cacheable-demo.service';

@Controller('cache-demo')
export class CacheableDemoController {
  constructor(private readonly cacheableDemoService: CacheableDemoService) {}

  @Get('expensive')
  async getExpensiveData() {
    return this.cacheableDemoService.getExpensiveData();
  }

  @Get('user/:userId')
  async getUserData(@Param('userId') userId: string) {
    return this.cacheableDemoService.getUserData(userId);
  }
}
