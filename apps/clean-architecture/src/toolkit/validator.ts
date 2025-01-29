export function assertNonNull<T>(
  value: T | null | undefined,
  message?: string,
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message ?? `Value must not be null or undefined`);
  }
}

export function assertGreaterThan(
  value: number,
  min: number,
  message?: string,
): asserts value is number {
  if (value <= min) {
    throw new Error(message ?? `Value must be greater than ${min}`);
  }
}
