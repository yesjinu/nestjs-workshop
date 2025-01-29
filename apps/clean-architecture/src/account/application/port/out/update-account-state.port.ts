import { Activity } from '../../../domain/activity';

export interface UpdateAccountStatePort {
  updateActivities(accountId: string, activities: Activity[]): Promise<void>;
}
