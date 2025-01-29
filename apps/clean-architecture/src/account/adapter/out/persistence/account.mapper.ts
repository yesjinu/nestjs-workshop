import { AccountPrismaEntity, ActivityPrismaEntity } from '@prisma/client';
import { Account } from '../../../domain/account';
import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';
import { ActivityWindow } from '../../../domain/activity-window';
import { ActivityMapper } from './activity.mapper';

export class AccountMapper {
  static mapToDomainEntity(
    account: AccountPrismaEntity,
    baselineBalance: number,
    activities: ActivityPrismaEntity[],
  ): Account {
    return new Account(
      new AccountId(account.id),
      new Money(baselineBalance),
      new ActivityWindow(activities.map(ActivityMapper.mapToDomainEntity)),
    );
  }

  static mapToPrismaEntity(account: Account): AccountPrismaEntity {
    return {
      id: account.id.id, // TODO: make this better?
    };
  }
}
