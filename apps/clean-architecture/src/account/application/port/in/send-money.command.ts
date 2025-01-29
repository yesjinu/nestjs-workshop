import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';
import { Assert } from '@app/toolkit';

export class SendMoneyCommand {
  constructor(
    readonly sourceAccountId: AccountId,
    readonly targetAccountId: AccountId,
    readonly money: Money,
  ) {
    Assert.nonNull(sourceAccountId);
    Assert.nonNull(targetAccountId);
    Assert.nonNull(money);
    Assert.isTrue(money.isPositive(), 'Amount must be greater than 0');

    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.money = money;
  }
}
