import { createReducer, on, Action } from '@ngrx/store';
import * as SecurityActions from './security.actions';
import { SecurityState, securityAdapter, securityInitialState } from './security.state';

const reducer = createReducer(
  securityInitialState(),
  on(SecurityActions.LogInSuccess, (state, { payload }) =>
    securityAdapter.upsertOne(payload, state)
  ),
  on(SecurityActions.LogInFailed, state => securityAdapter.removeAll(state)),
  on(SecurityActions.LogOutSuccess, state => securityAdapter.removeAll(state)),
  on(SecurityActions.LogOutFailed, state => securityAdapter.removeAll(state))
);

export function SecurityReducer(
  state: SecurityState,
  action: Action
): SecurityState {
  return reducer(state, action);
}
