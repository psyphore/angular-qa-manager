import { createReducer, on, Action } from '@ngrx/store';
import * as MeActions from './me.actions';
import { MeState, meAdapter, meInitialState } from './me.state';

const reducer = createReducer(
  meInitialState(),
  on(MeActions.LoadMeSuccess, (state, { payload }) =>
    meAdapter.upsertOne(payload, state)
  ),
  on(MeActions.UpdateSuccess, (state, { payload }) => ({
    ...state,
    [state.entities.me.me.id]: payload.me.id
  })),
  on(MeActions.LoadMeFailed, state => meAdapter.removeAll(state))
);
export function MeReducer(state: MeState, action: Action) {
  return reducer(state, action);
}
