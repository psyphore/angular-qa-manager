import { createReducer, on, Action } from '@ngrx/store';
import * as SecurityActions from './security.actions';
import { SecurityState, securityAdapter } from './security.state';

export function securityInitialState(): SecurityState {
  return securityAdapter.getInitialState();
}

export const securityReducer = createReducer(
  securityInitialState(),
  on(SecurityActions.LogInSuccess, (state, { payload }) =>
    securityAdapter.upsertOne(payload, state)
  ),
  on(SecurityActions.LogInFailed, state => securityAdapter.removeAll(state)),
  on(SecurityActions.LogOutSuccess, state => securityAdapter.removeAll(state)),
  on(SecurityActions.LogOutFailed, state => securityAdapter.removeAll(state))
);

export function SecurityRed(state: SecurityState, action: Action) {
  return securityReducer(state, action);
}
