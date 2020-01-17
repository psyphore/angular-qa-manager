import { on, createReducer, Action } from '@ngrx/store';
import * as EnumsActions from '@states/enums/enums.actions';
import {
  EnumsState,
  enumsAdapter,
  enumsInitialState
} from '@states/enums/enums.state';

const reducer = createReducer(
  enumsInitialState(),
  on(EnumsActions.LoadOptionsSuccess, (state, { payload }) =>
    enumsAdapter.upsertOne(payload, state)
  ),
  on(EnumsActions.LoadOptionsFailed, state => enumsAdapter.removeAll(state))
);

export function enumsReducer(
  state: EnumsState = enumsInitialState(),
  action: Action
): EnumsState {
  return reducer(state, action);
}
