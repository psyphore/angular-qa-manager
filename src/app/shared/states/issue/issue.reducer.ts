import { on, createReducer, Action } from '@ngrx/store';
import * as IssueActions from './issue.actions';
import { IssueState, issueAdapter, issueInitialState } from './issue.state';

const reducer = createReducer(
  issueInitialState(),
  on(IssueActions.LoadSuccess, (state, { payload }) =>
    issueAdapter.addAll(payload, state)
  ),
  on(IssueActions.LoadFailed, state => issueAdapter.removeAll(state)),
  on(IssueActions.LoadOneSuccess, (state, { payload }) =>
    issueAdapter.upsertOne(payload, state)
  ),
  on(IssueActions.LoadOneFailed, state => issueAdapter.removeAll(state))
);

export function issueReducer(
  state: IssueState = issueInitialState(),
  action: Action
): IssueState {
  return reducer(state, action);
}
