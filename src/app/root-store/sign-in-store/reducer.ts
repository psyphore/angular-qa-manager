import { createReducer, on, Action } from '@ngrx/store';
import {
  signInRequest,
  signInRequestFailure,
  signInRequestSuccess
} from './actions';
import { initialState, State } from './state';

const reducer = createReducer(
  initialState,
  on(signInRequest, state => ({
    ...state,
    token: null,
    isLoading: true,
    error: null
  })),
  on(signInRequestSuccess, (state, { payload }) => ({
    ...state,
    token: payload.login.jwt,
    isLoading: false,
    error: null
  })),
  on(signInRequestFailure, (state, { errorMessage }) => ({
    ...state,
    token: null,
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
