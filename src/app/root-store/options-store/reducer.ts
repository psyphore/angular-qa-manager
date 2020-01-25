import { createReducer, on, Action } from '@ngrx/store';
import {
  Actions,
  loadOptions,
  loadOptionsFailure,
  loadOptionsSuccess
} from './actions';
import { initialState, State } from './state';

const reducer = createReducer(
  initialState,
  on(loadOptions, state => ({
    ...state,
    values: null,
    isLoading: true,
    error: null
  })),
  on(loadOptionsSuccess, (state, { payload }) => ({
    ...state,
    values: payload,
    isLoading: false,
    error: null
  })),
  on(loadOptionsFailure, (state, { payload }) => ({
    ...state,
    values: null,
    isLoading: false,
    error: payload.errorMessage
  }))
);

export function featureReducer(
  state: State | undefined,
  action: Action
): State {
  return reducer(state, action);
}
