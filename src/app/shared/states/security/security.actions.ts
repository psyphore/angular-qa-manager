import { createAction, union } from '@ngrx/store';

import { SignInCredentials, SignIn } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';

export const LogIn = createAction(
  SecurityActionTypes.SIGN_IN,
  (payload: SignInCredentials) => ({ payload })
);

export const LogInSuccess = createAction(
  SecurityActionTypes.SIGN_IN_SUCCESS,
  (payload: SignIn) => ({ payload })
);
export const LogInFailed = createAction(
  SecurityActionTypes.SIGN_IN_FAILED,
  (message: string | any) => ({ message })
);

export const LogOut = createAction(SecurityActionTypes.SIGN_OUT);

export const LogOutSuccess = createAction(SecurityActionTypes.SIGN_OUT_SUCCESS);

export const LogOutFailed = createAction(
  SecurityActionTypes.SIGN_OUT_FAILED,
  (message: string | any) => ({ message })
);

const actions = union({
  LogIn,
  LogInSuccess,
  LogInFailed,
  LogOut,
  LogOutSuccess,
  LogOutFailed
});

export type SecurityActions = typeof actions;
