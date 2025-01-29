import { Body, Controller, Param, Post } from '@nestjs/common';
import { SendMoneyService } from '../../../application/send-money.service';
import { SendMoneyCommand } from '../../../application/port/in/send-money.command';
import { AccountId } from '../../../domain/account-id';
import { Money } from '../../../domain/money';
import { SendMoneyDto } from './send-money.dto';

@Controller()
export class AccountController {
  constructor(private readonly sendMoneyService: SendMoneyService) {}

  @Post('accounts/send')
  async sendMoney(@Body() dto: SendMoneyDto): Promise<boolean> {
    const command = new SendMoneyCommand( // adapter -> domain
      new AccountId(dto.sourceAccountId),
      new AccountId(dto.targetAccountId),
      new Money(dto.amount),
    );
    return this.sendMoneyService.sendMoney(command);
  }
}
