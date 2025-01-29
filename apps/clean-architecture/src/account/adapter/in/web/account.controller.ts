import { Controller, Param, Post } from '@nestjs/common';
import { SendMoneyService } from '../../../application/send-money.service';
import { SendMoneyCommand } from '../../../application/port/in/send-money.command';
import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';

@Controller()
export class AccountController {
  constructor(private readonly sendMoneyService: SendMoneyService) {}

  @Post('accounts/send/:sourceAccountId/:targetAccountId/:amount')
  async sendMoney(
    @Param('sourceAccountId') sourceAccountId: string,
    @Param('targetAccountId') targetAccountId: string,
    @Param('amount') amount: number,
  ): Promise<boolean> {
    const command = new SendMoneyCommand(
      new AccountId(sourceAccountId),
      new AccountId(targetAccountId),
      new Money(amount),
    );
    return this.sendMoneyService.sendMoney(command);
  }
}
