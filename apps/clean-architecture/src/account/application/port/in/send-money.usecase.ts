export interface SendMoneyUseCase {
  sendMoney(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ): Promise<void>;
}
