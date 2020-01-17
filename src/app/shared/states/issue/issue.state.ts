import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity';

import { Issue } from '@models/issue.interface';

export const issueAdapter = createEntityAdapter<Issue>();
export interface IssueState extends EntityState<Issue> {}
export function issueInitialState(): IssueState {
  return issueAdapter.getInitialState();
}
