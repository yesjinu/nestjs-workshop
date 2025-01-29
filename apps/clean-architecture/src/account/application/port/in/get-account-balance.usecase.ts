import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<Money>;
}
