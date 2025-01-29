import { Account } from '../../../domain/account';

export interface CreateAccountPort {
  createAccount(account: Account): Promise<void>;
}
