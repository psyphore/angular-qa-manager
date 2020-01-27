import { loadProfileSuccess, loadProfileFailure, loadProfile } from './actions';
import { initialState, State } from './state';
import { on, createReducer, Action } from '@ngrx/store';

const reducer = createReducer(
  initialState,
  on(loadProfile, state => ({
    ...state,
    profile: null,
    isLoading: true,
    error: null
  })),
  on(loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    isLoading: false,
    error: null
  })),
  on(loadProfileFailure, (state, { errorMessage }) => ({
    ...state,
    profile: null,
    isLoading: false,
    error: errorMessage
  }))
);

export function featureReducer(
  state: State | undefined,
  action: Action
): State {
  return reducer(state, action);
}
