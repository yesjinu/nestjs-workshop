import { Activity } from '../../../domain/Activity';

export interface UpdateAccountStatePort {
  updateActivities(accountId: string, activities: Activity[]): Promise<void>;
}
