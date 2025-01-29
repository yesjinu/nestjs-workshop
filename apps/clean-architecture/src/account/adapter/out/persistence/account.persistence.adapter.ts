import { PrismaService } from '@app/buckpal-prisma-schema/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateAccountStatePort } from '../../../application/port/out/update-account-state.port';
import { LoadAccountPort } from '../../../application/port/out/load-account.port';
import { Account } from '../../../domain/account';
import { AccountId } from '../../../domain/account-id';
import { Activity } from '../../../domain/activity';
import { AccountPrismaEntity, ActivityPrismaEntity } from '@prisma/client';
import { AccountMapper } from './account.mapper';
import { ActivityMapper } from './activity.mapper';
@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(private readonly prismaService: PrismaService) {}

  async loadAccount(
    accountId: AccountId,
    baselineDate: Date,
  ): Promise<Account> {
    const account: AccountPrismaEntity =
      await this.prismaService.accountPrismaEntity.findFirstOrThrow({
        where: {
          id: accountId.id,
        },
      });

    const activities: ActivityPrismaEntity[] =
      await this.prismaService.activityPrismaEntity.findMany({
        where: {
          targetAccountId: accountId.id,
          timestamp: {
            gte: baselineDate,
          },
        },
      });

    const baselineBalance = 0; // TODO: calc account balance..

    return AccountMapper.mapToDomainEntity(
      account,
      baselineBalance,
      activities,
    );
  }

  async updateActivities(
    accountId: AccountId,
    activities: Activity[],
  ): Promise<void> {
    activities.forEach(async (activity) => {
      if (activity.id === null || activity.id === undefined) {
        await this.prismaService.activityPrismaEntity.create({
          data: ActivityMapper.mapToPrismaEntity(activity),
        });
      }
    });
  }
}
