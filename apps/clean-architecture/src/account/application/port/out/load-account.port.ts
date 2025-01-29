import { Account } from '../../../domain/account';
import { AccountId } from '../../../domain/account-id';

export interface LoadAccountPort {
  loadAccount(accountId: AccountId, baselineDate: Date): Promise<Account>;
}
