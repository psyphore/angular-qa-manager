import { Action } from '@ngrx/store';
import { Me } from '../../shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_ME_REQUEST = '[Me] Load Request',
  LOAD_ME_FAILURE = '[Me] Load Failure',
  LOAD_ME_SUCCESS = '[Me] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_ME_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_ME_FAILURE;
  constructor(public payload: { error: string | any }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ME_SUCCESS;
  constructor(public payload: { profile: Me }) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
