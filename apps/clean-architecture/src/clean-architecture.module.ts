import { Module } from '@nestjs/common';
import { CleanArchitectureController } from './clean-architecture.controller';
import { CleanArchitectureService } from './clean-architecture.service';

@Module({
  imports: [],
  controllers: [CleanArchitectureController],
  providers: [CleanArchitectureService],
})
export class CleanArchitectureModule {}
