import { createAction, props } from '@ngrx/store';

import { SignInCredentials, Me, SignIn } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';

export const LogIn = createAction(
  SecurityActionTypes.SIGN_IN,
  props<{ payload: SignInCredentials }>()
);

export const LogInSuccess = createAction(
  SecurityActionTypes.SIGN_IN_SUCCESS,
  props<{ payload: SignIn }>()
);
export const LogInFailed = createAction(
  SecurityActionTypes.SIGN_IN_FAILED,
  props<{ message: string }>()
);

export const LogOut = createAction(SecurityActionTypes.SIGN_OUT);

export const LogOutSuccess = createAction(SecurityActionTypes.SIGN_OUT_SUCCESS);

export const LogOutFailed = createAction(
  SecurityActionTypes.SIGN_OUT_FAILED,
  props<{ message: string }>()
);

export const LoadSecurity = createAction(
  SecurityActionTypes.LOAD_SECURITY,
  props<{ payload: Me | undefined }>()
);

export const LoadSecuritySuccess = createAction(
  SecurityActionTypes.LOAD_SECURITY_SUCCESS,
  props<{ payload: Me }>()
);

export const LoadSecurityFailed = createAction(
  SecurityActionTypes.LOAD_SECURITY_FAILED,
  props<{ message: string }>()
);

export const Update = createAction(
  SecurityActionTypes.UPDATE,
  props<{ payload: Me }>()
);

export const UpdateSuccess = createAction(
  SecurityActionTypes.UPDATE_SUCCESS,
  props<{ payload: Me }>()
);

export const UpdateFailed = createAction(
  SecurityActionTypes.UPDATE_FAILED,
  props<{ message: string }>()
);
