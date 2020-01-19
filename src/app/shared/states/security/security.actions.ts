import { createAction, props, union } from '@ngrx/store';

import { SignInCredentials, SignIn } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';

export const LogIn = createAction(
  SecurityActionTypes.SIGN_IN,
  // (payload: SignInCredentials) => ({ payload })
  props<{payload: SignInCredentials}>()
);

export const LogInSuccess = createAction(
  SecurityActionTypes.SIGN_IN_SUCCESS,
  // (payload: SignIn) => ({ payload })
  props<{payload: SignIn}>()
);
export const LogInFailed = createAction(
  SecurityActionTypes.SIGN_IN_FAILED,
  // (message: string | any) => ({ message })
  props<{message: string | any}>()
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
