import { Action } from '@ngrx/store';
import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export enum ActionTypes {
  LOAD_REQUEST = '[Options] Load Request',
  LOAD_FAILURE = '[Options] Load Failure',
  LOAD_SUCCESS = '[Options] Load Success'
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
  constructor(public payload: EnumsResponse) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
