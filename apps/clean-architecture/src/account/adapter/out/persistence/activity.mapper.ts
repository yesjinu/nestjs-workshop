import { ActivityPrismaEntity } from '@prisma/client';
import { AccountId } from '../../../domain/account-id';
import { Activity } from '../../../domain/activity';
import { Money } from '../../../domain/money';

export class ActivityMapper {
  static mapToDomainEntity(activity: ActivityPrismaEntity): Activity {
    return new Activity(
      activity.id,
      new AccountId(activity.sourceAccountId),
      new AccountId(activity.targetAccountId),
      activity.timestamp,
      new Money(activity.amount),
    );
  }

  static mapToPrismaEntity(activity: Activity): ActivityPrismaEntity {
    return {
      id: activity.id,
      timestamp: activity.timestamp,
      ownerAccountId: activity.fromAccountId.id,
      sourceAccountId: activity.fromAccountId.id,
      targetAccountId: activity.toAccountId.id,
      amount: activity.amount.getAmount(),
    };
  }
}
