import {
  assertNonNull,
  assertTrue,
} from 'apps/clean-architecture/src/toolkit/validator';
import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';

export class SendMoneyCommand {
  constructor(
    readonly sourceAccountId: AccountId,
    readonly targetAccountId: AccountId,
    readonly money: Money,
  ) {
    assertNonNull(sourceAccountId);
    assertNonNull(targetAccountId);
    assertNonNull(money);
    assertTrue(money.isPositive(), 'Amount must be greater than 0');

    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.money = money;
  }
}
