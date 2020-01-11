import { createReducer, on, Action } from '@ngrx/store';
import * as MeActions from './me.actions';
import { MeState, meAdapter } from './me.state';

export function meInitialState(): MeState {
  return meAdapter.getInitialState();
}
export const meReducer = createReducer(
  meInitialState(),
  on(MeActions.LoadSecuritySuccess, (state, { payload }) =>
    meAdapter.upsertOne(payload, state)
  ),
  on(MeActions.UpdateSuccess, (state, { payload }) => ({
    ...state,
    [state.entities.me.me.id]: payload.me.id
  })),
  on(MeActions.LoadSecurityFailed, state => meAdapter.removeAll(state))
);
export function MeRed(state: MeState, action: Action) {
  return meReducer(state, action);
}
