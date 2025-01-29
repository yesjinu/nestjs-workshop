import { Injectable } from '@nestjs/common';
import { SendMoneyUseCase } from './port/in/send-money.usecase';
import { SendMoneyCommand } from './port/in/send-money.command';

@Injectable()
export class SendMoneyService implements SendMoneyUseCase {
  constructor() {}

  sendMoney(command: SendMoneyCommand): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
