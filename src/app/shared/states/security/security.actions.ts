import { Action } from '@ngrx/store';
import { SignInCredentials, Me, SignIn } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';

export class LogIn implements Action {
  readonly type = SecurityActionTypes.SIGN_IN;
  constructor(public security: SignInCredentials) {}
}

export class LogInSuccess implements Action {
  readonly type = SecurityActionTypes.SIGN_IN_SUCCESS;
  constructor(public security: SignIn) {}
}

export class LogInFailed implements Action {
  readonly type = SecurityActionTypes.SIGN_IN_FAILED;
  constructor(public message: string) {}
}

export class LogOut implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT;
  constructor() {}
}

export class LogOutSuccess implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT_SUCCESS;
  constructor() {}
}

export class LogOutFailed implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT_FAILED;
  constructor(public message: string) {}
}

export class LoadSecurity implements Action {
  readonly type = SecurityActionTypes.LOAD_SECURITY;

  constructor(public payload: Me = null) {}
}

export class LoadSecuritySuccess implements Action {
  readonly type = SecurityActionTypes.LOAD_SECURITY_SUCCESS;

  constructor(public payload: Me) {}
}

export class LoadSecurityFailed implements Action {
  readonly type = SecurityActionTypes.LOAD_SECURITY_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  readonly type = SecurityActionTypes.UPDATE;

  constructor(public payload: Me) {}
}

export class UpdateSuccess implements Action {
  readonly type = SecurityActionTypes.UPDATE_SUCCESS;

  constructor(public payload: Me) {}
}

export class UpdateFailed implements Action {
  readonly type = SecurityActionTypes.UPDATE_FAILED;

  constructor(public message: string) {}
}

export type SecurityActions =
  | LoadSecuritySuccess
  | LogIn
  | LogInSuccess
  | LogInFailed
  | Update
  | UpdateSuccess
  | UpdateFailed
  | LogOut
  | LogOutSuccess
  | LogOutFailed;
