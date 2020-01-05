import { createReducer, on, Action } from '@ngrx/store';
import * as SecurityActions from './security.actions';
import {
  SecurityState,
  securityAdapter,
  MeState,
  meAdapter
} from './security.state';

export function securityInitialState(): SecurityState {
  return securityAdapter.getInitialState();
}

export function meInitialState(): MeState {
  return meAdapter.getInitialState();
}

export const securityReducer = createReducer(
  securityInitialState(),
  on(SecurityActions.LogInSuccess, (state, { payload }) =>
    securityAdapter.addOne(payload, state)
  ),
  on(SecurityActions.LogOutSuccess, state => securityAdapter.removeAll(state))
);

export const meReducer = createReducer(
  meInitialState(),
  on(SecurityActions.LoadSecuritySuccess, (state, { payload }) =>
    meAdapter.addOne(payload, state)
  ),
  on(SecurityActions.UpdateSuccess, (state, { payload }) =>
    meAdapter.updateOne(payload.me.id, state)
  )
);

export function SecurityRed(state: SecurityState, action: Action) {
  return securityReducer(state, action);
}

export function MeRed(state: MeState, action: Action) {
  return meReducer(state, action);
}
