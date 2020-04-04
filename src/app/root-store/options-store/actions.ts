import { EnumsResponse } from '@shared/interfaces/enums.interface';

export enum ActionTypes {
  LOAD_OPTIONS_REQUEST = '[Options] Load Request',
  LOAD_OPTIONS_FAILURE = '[Options] Load Failure',
  LOAD_OPTIONS_SUCCESS = '[Options] Load Success'
}

export class LoadOptions {
  static readonly type = ActionTypes.LOAD_OPTIONS_REQUEST;
}

export class LoadOptionsFailure {
  static readonly type = ActionTypes.LOAD_OPTIONS_FAILURE;
  constructor(public message: string) { }
}

export class LoadOptionsSuccess {
  static readonly type = ActionTypes.LOAD_OPTIONS_SUCCESS;
  constructor(public payload: EnumsResponse) { }
}
