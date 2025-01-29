import { Injectable } from '@nestjs/common';
import { AccountId } from '../domain/account-id';
import { Money } from '../domain/money';
import { GetAccountBalanceQuery } from './port/in/get-account-balance.usecase';

@Injectable()
export class GetAccountBalanceService implements GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<Money> {
    throw new Error('Method not implemented.');
  }
}
