import { Controller, Get } from '@nestjs/common';
import { CleanArchitectureService } from './clean-architecture.service';

@Controller()
export class CleanArchitectureController {
  constructor(private readonly cleanArchitectureService: CleanArchitectureService) {}

  @Get()
  getHello(): string {
    return this.cleanArchitectureService.getHello();
  }
}
