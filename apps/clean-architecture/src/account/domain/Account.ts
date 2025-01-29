import { AccountId } from './account-id';
import { Activity } from './activity';
import { ActivityWindow } from './activity-window';
import { Money } from './money';

export class Account {
  private readonly id: AccountId;
  private readonly baselineBalance: Money;
  private readonly activityWindow: ActivityWindow;

  calculateBalance(): Money {
    return Money.add(
      this.baselineBalance,
      this.activityWindow.calculateBalance(this.id),
    );
  }

  withdraw(money: Money, targetAccountId: AccountId): boolean {
    if (!this.mayWidraw(money)) {
      return false;
    }

    const withdrawal = new Activity(
      this.id,
      targetAccountId,
      new Date(),
      money,
    );

    this.activityWindow.addActivity(withdrawal);
    return true;
  }

  private mayWidraw(money: Money): boolean {
    return Money.add(this.calculateBalance(), money.negate()).isPositive();
  }

  deposit(money: Money, sourceAccountId: AccountId): boolean {
    const deposit = new Activity(sourceAccountId, this.id, new Date(), money);
    this.activityWindow.addActivity(deposit);
    return true;
  }
}
