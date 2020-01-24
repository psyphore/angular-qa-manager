import { Action } from '@ngrx/store';
import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export enum ActionTypes {
  LOAD_OPTIONS_REQUEST = '[Options] Load Request',
  LOAD_OPTIONS_FAILURE = '[Options] Load Failure',
  LOAD_OPTIONS_SUCCESS = '[Options] Load Success'
}

export class LoadRequestAction implements Action {
  readonly type = ActionTypes.LOAD_OPTIONS_REQUEST;
}

export class LoadFailureAction implements Action {
  readonly type = ActionTypes.LOAD_OPTIONS_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_OPTIONS_SUCCESS;
  constructor(public payload: EnumsResponse) {}
}

export type Actions = LoadRequestAction | LoadFailureAction | LoadSuccessAction;
