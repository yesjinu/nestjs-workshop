import { Inject, Injectable } from '@nestjs/common';
import { AccountId } from '../domain/account-id';
import { Money } from '../domain/money';
import { GetAccountBalanceQuery } from './port/in/get-account-balance.usecase';
import { LoadAccountPort } from './port/out/load-account.port';
import { LOAD_ACCOUNT_PORT } from './tokens';

@Injectable()
export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(
    @Inject(LOAD_ACCOUNT_PORT)
    private readonly loadAccountPort: LoadAccountPort,
  ) {}

  async getAccountBalance(accountId: AccountId): Promise<Money> {
    const account = await this.loadAccountPort.loadAccount(
      accountId,
      new Date(),
    );

    return account.calculateBalance();
  }
}
