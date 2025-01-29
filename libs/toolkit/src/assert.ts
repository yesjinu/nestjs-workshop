export class Assert {
  static nonNull<T>(
    value: T | null | undefined,
    message?: string,
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message ?? 'Value must not be null or undefined');
    }
  }

  static greaterThan(
    value: number,
    min: number,
    message?: string,
  ): asserts value is number {
    if (value <= min) {
      throw new Error(message ?? `Value must be greater than ${min}`);
    }
  }

  static isTrue(value: boolean, message?: string): asserts value is true {
    if (!value) {
      throw new Error(message ?? 'Value must be true');
    }
  }
}
