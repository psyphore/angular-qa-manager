import { createFeatureSelector } from '@ngrx/store';
import { IssueState, issueAdapter } from './project.state';

export const selectIssueState = createFeatureSelector<IssueState>('issue');

export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll
} = issueAdapter.getSelectors(selectIssueState);
