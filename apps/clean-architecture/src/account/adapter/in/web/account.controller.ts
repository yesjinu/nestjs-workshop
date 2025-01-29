import { Body, Controller, Inject, Param, Post } from '@nestjs/common';
import { SendMoneyCommand } from '../../../application/port/in/send-money.command';
import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';
import { SendMoneyDto } from './send-money.dto';
import { SendMoneyUseCase } from '../../../application/port/in/send-money.usecase';
import { SEND_MONEY_USE_CASE } from '../../../application/tokens';

@Controller()
export class AccountController {
  constructor(
    @Inject(SEND_MONEY_USE_CASE)
    private readonly sendMoneyUsecase: SendMoneyUseCase,
  ) {}

  @Post('accounts/send')
  async sendMoney(@Body() dto: SendMoneyDto): Promise<boolean> {
    const command = new SendMoneyCommand( // adapter -> domain
      new AccountId(dto.sourceAccountId),
      new AccountId(dto.targetAccountId),
      new Money(dto.amount),
    );
    return this.sendMoneyUsecase.sendMoney(command);
  }
}
