import { Module } from '@nestjs/common';
import { CleanArchitectureController } from './clean-architecture.controller';
import { CleanArchitectureService } from './clean-architecture.service';
import { AccountModule } from './account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [CleanArchitectureController],
  providers: [CleanArchitectureService],
})
export class CleanArchitectureModule {}
