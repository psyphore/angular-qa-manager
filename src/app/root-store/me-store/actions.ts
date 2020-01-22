import { Action } from '@ngrx/store';
import { Me } from '../../shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_REQUEST = '[Me] Load Request',
  LOAD_FAILURE = '[Me] Load Failure',
  LOAD_SUCCESS = '[Me] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Me) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
