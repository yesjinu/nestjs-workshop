/**
 * Rule of Exception code:
 * - Exception code is a 5-digit number
 * - the first three digits represent the HTTP status code
 * - the last two digits represent the error code
 */
export enum ExceptionCode {
  // 400
  BAD_INPUT = '40000',

  // 404
  PASSWORD_OR_EMAIL_MISMATCH = '40400',
  USER_NOT_FOUND = '40401',

  // 409
  USER_ALREADY_EXISTS = '40900',
  AUTHORIZATION_FAILED = '40901',

  // 500
  BAD_SERVER_CONFIGURATIONS = '50000',

  // 599
  UNCAUGHT_EXCEPTION = '59999',
}
