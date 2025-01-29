import {
  assertGreaterThan,
  assertNonNull,
} from 'apps/clean-architecture/src/toolkit/validator';

export class SendMoneyCommand {
  constructor(
    readonly sourceAccountId: string,
    readonly targetAccountId: string,
    readonly amount: number,
  ) {
    assertNonNull(sourceAccountId);
    assertNonNull(targetAccountId);
    assertNonNull(amount);
    assertGreaterThan(amount, 0, 'Amount must be greater than 0');

    this.sourceAccountId = sourceAccountId;
    this.targetAccountId = targetAccountId;
    this.amount = amount;
  }
}
