import { Account } from '../../../domain/Account.1';

export interface LoadAccountPort {
  loadAccount(accountId: string): Promise<Account>;
}
