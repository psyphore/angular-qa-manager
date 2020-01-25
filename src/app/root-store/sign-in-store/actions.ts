import { createAction, union } from '@ngrx/store';
import {
  SignIn,
  SignInCredentials
} from '../../shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_REQUEST = '[Sign In] Load Request',
  LOAD_FAILURE = '[Sign In] Load Failure',
  LOAD_SUCCESS = '[Sign In] Load Success'
}

export const signInRequest = createAction(
  ActionTypes.LOAD_REQUEST,
  (payload: SignInCredentials) => ({ payload })
);

export const signInRequestFailure = createAction(
  ActionTypes.LOAD_FAILURE,
  (errorMessage = 'Failed to SignIn') => ({ errorMessage })
);

export const signInRequestSuccess = createAction(
  ActionTypes.LOAD_SUCCESS,
  (payload: SignIn) => ({ payload })
);

const actions = union({
  signInRequest,
  signInRequestFailure,
  signInRequestSuccess
});

export type Actions = typeof actions;
