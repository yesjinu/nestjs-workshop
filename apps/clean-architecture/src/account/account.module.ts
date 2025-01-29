import { Module } from '@nestjs/common';
import { AccountController } from './adapter/in/web/account.controller';
import { SendMoneyService } from './application/send-money.service';
import { GetAccountBalanceService } from './application/get-account-balance.service';
import {
  GET_ACCOUNT_BALANCE_USE_CASE,
  LOAD_ACCOUNT_PORT,
  SEND_MONEY_USE_CASE,
  UPDATE_ACCOUNT_STATE_PORT,
} from './application/tokens';
import { BuckpalPrismaSchemaModule } from '@app/buckpal-prisma-schema';
import { AccountPersistenceAdapter } from './adapter/out/persistence/account.persistence.adapter';

@Module({
  imports: [BuckpalPrismaSchemaModule],
  controllers: [AccountController],
  providers: [
    {
      provide: SEND_MONEY_USE_CASE,
      useClass: SendMoneyService,
    },
    {
      provide: GET_ACCOUNT_BALANCE_USE_CASE,
      useClass: GetAccountBalanceService,
    },
    {
      provide: LOAD_ACCOUNT_PORT,
      useClass: AccountPersistenceAdapter,
    },
    {
      provide: UPDATE_ACCOUNT_STATE_PORT,
      useClass: AccountPersistenceAdapter,
    },
  ],
})
export class AccountModule {}
