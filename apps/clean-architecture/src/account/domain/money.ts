export class Money {
  constructor(private readonly amount: number) {}

  static add(arg1: Money, arg2: Money): Money {
    return new Money(arg1.amount + arg2.amount);
  }

  getAmount(): number {
    return this.amount;
  }

  isPositive(): boolean {
    return this.amount > 0;
  }

  negate(): Money {
    return new Money(-this.amount);
  }
}
