import { Account } from '../../../domain/account';

export interface LoadAccountPort {
  loadAccount(accountId: string): Promise<Account>;
}
