import { Inject, Injectable } from '@nestjs/common';
import { SendMoneyUseCase } from './port/in/send-money.usecase';
import { SendMoneyCommand } from './port/in/send-money.command';
import { LoadAccountPort } from './port/out/load-account.port';
import { LOAD_ACCOUNT_PORT, UPDATE_ACCOUNT_STATE_PORT } from './tokens';
import { UpdateAccountStatePort } from './port/out/update-account-state.port';
import { AccountId } from '../domain/account-id';

@Injectable()
export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    @Inject(LOAD_ACCOUNT_PORT)
    private readonly loadAccountPort: LoadAccountPort,
    @Inject(UPDATE_ACCOUNT_STATE_PORT)
    private readonly updateAccountStatePort: UpdateAccountStatePort,
  ) {}

  async sendMoney(command: SendMoneyCommand): Promise<boolean> {
    const sourceAccount = await this.loadAccountPort.loadAccount(
      command.sourceAccountId,
      new Date(),
    );
    const targetAccount = await this.loadAccountPort.loadAccount(
      command.targetAccountId,
      new Date(),
    );

    sourceAccount.withdraw(command.money, command.targetAccountId);
    targetAccount.deposit(command.money, command.sourceAccountId);

    await this.updateAccountStatePort.updateActivities(
      new AccountId(sourceAccount.id.id),
      sourceAccount.activityWindow.activities,
    );
    await this.updateAccountStatePort.updateActivities(
      new AccountId(targetAccount.id.id),
      targetAccount.activityWindow.activities,
    );

    return true;
  }
}
