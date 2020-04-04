import {
  SignIn as RequestPaylod,
  SignInCredentials
} from '@shared/interfaces/security.interface';

export enum ActionTypes {
  SIGNIN_REQUEST = '[Sign In] Request',
  SIGNIN_FAILURE = '[Sign In] Failure',
  SIGNIN_SUCCESS = '[Sign In] Success',
  SIGNOUT_REQUEST = '[Sign Out] Request',
  SIGNOUT_SUCCESS = '[Sign Out] Success',
  SIGNOUT_FAILURE = '[Sign Out] Failure'
}

export class SigningIn {
  static readonly type = ActionTypes.SIGNIN_REQUEST;
  constructor(public payload: SignInCredentials) { }
}

export class SignInSuccess {
  static readonly type = ActionTypes.SIGNIN_SUCCESS;
  constructor(public payload: RequestPaylod) { }
}

export class SignInFailure {
  static readonly type = ActionTypes.SIGNIN_FAILURE;
  constructor(public message: string) { }
}

export class SigningOut {
  static readonly type = ActionTypes.SIGNOUT_REQUEST;
}

export class SignOutSuccess {
  static readonly type = ActionTypes.SIGNOUT_SUCCESS;
}

export class SignOutFailure {
  static readonly type = ActionTypes.SIGNOUT_FAILURE;
  constructor(public message: string) { }
}
