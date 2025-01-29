import { AccountId } from './account-id';
import { Money } from './money';

export class Activity {
  constructor(
    // readonly id: string,
    readonly fromAccountId: AccountId,
    readonly toAccountId: AccountId,
    readonly timestamp: Date,
    readonly amount: Money,
  ) {}
}
