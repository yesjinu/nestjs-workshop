import { PrismaService } from '@app/buckpal-prisma-schema/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateAccountStatePort } from '../../../application/port/out/update-account-state.port';
import { LoadAccountPort } from '../../../application/port/out/load-account.port';
import { Account } from '../../../domain/account';
import { AccountId } from '../../../domain/account-id';
import { Activity } from '../../../domain/activity';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(private readonly prismaService: PrismaService) {}

  loadAccount(accountId: AccountId): Promise<Account> {
    throw new Error('Method not implemented.');
  }

  updateActivities(
    accountId: AccountId,
    activities: Activity[],
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
