import { AccountId } from './account-id';
import { Activity } from './activity';
import { Money } from './money';

export class ActivityWindow {
  constructor(readonly activities: Activity[]) {}

  addActivity(activity: Activity): void {
    this.activities.push(activity);
  }

  calculateBalance(accountId: AccountId): Money {
    return this.activities
      .filter((activity) => activity.fromAccountId === accountId)
      .reduce((sum, activity) => Money.add(sum, activity.amount), new Money(0));
  }
}
