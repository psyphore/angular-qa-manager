import { Action } from '@ngrx/store';

import { SignInCredentials, SignIn } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';

export class LogIn implements Action {
  readonly type = SecurityActionTypes.SIGN_IN;
  constructor(public payload: SignInCredentials) {}
}

export class LogInSuccess implements Action {
  readonly type = SecurityActionTypes.SIGN_IN_SUCCESS;
  constructor(public payload: SignIn) {}
}
export class LogInFailed implements Action {
  readonly type = SecurityActionTypes.SIGN_IN_FAILED;
  constructor(public message: string | any) {}
}

export class LogOut implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT;
}

export class LogOutSuccess implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT_SUCCESS;
}

export class LogOutFailed implements Action {
  readonly type = SecurityActionTypes.SIGN_OUT_FAILED;
  constructor(public message: string | any) {}
}
export type SignInActions =
  | LogIn
  | LogInSuccess
  | LogInFailed
  | LogOut
  | LogOutSuccess
  | LogOutFailed;
