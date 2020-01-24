import { Action } from '@ngrx/store';
import {
  SignIn,
  SignInCredentials
} from '../../shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_REQUEST = '[Sign In] Load Request',
  LOAD_FAILURE = '[Sign In] Load Failure',
  LOAD_SUCCESS = '[Sign In] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
  constructor(public payload: SignInCredentials) {}
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: SignIn | any) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
