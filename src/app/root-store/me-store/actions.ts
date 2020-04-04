import { Me } from '@shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_ME_REQUEST = '[Me] Load Request',
  LOAD_ME_FAILURE = '[Me] Load Failure',
  LOAD_ME_SUCCESS = '[Me] Load Success'
}

export class LoadProfile {
  static readonly type = ActionTypes.LOAD_ME_REQUEST;
}

export class ProfileSuccess {
  static readonly type = ActionTypes.LOAD_ME_SUCCESS;
  constructor(public payload: Me) { }
}

export class ProfileFailure {
  static readonly type = ActionTypes.LOAD_ME_FAILURE;
  constructor(public message: string) { }
}
