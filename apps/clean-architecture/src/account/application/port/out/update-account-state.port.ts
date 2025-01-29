import { AccountId } from '../../../domain/account-id';
import { Activity } from '../../../domain/activity';
export interface UpdateAccountStatePort {
  updateActivities(accountId: AccountId, activities: Activity[]): Promise<void>;
}
