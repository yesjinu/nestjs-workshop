import { Module } from '@nestjs/common';
import { AccountController } from './adapter/in/web/account.controller';
import { SendMoneyService } from './application/send-money.service';
import { GetAccountBalanceService } from './application/get-account-balance.service';
import { LOAD_ACCOUNT_PORT, SEND_MONEY_USE_CASE } from './application/tokens';
import { BuckpalPrismaSchemaModule } from '@app/buckpal-prisma-schema';

@Module({
  imports: [BuckpalPrismaSchemaModule],
  controllers: [AccountController],
  providers: [
    {
      provide: SEND_MONEY_USE_CASE,
      useClass: SendMoneyService,
    },
    {
      provide: LOAD_ACCOUNT_PORT,
      useClass: GetAccountBalanceService,
    },
  ],
})
export class AccountModule {}
