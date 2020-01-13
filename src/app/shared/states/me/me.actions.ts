import { createAction, union } from '@ngrx/store';

import { Me } from '@models/security.interface';
import { SecurityActionTypes } from '@enums/security.enum';
export const LoadSecurity = createAction(
  SecurityActionTypes.LOAD_SECURITY,
  (payload: Me | undefined) => ({ payload })
);

export const LoadSecuritySuccess = createAction(
  SecurityActionTypes.LOAD_SECURITY_SUCCESS,
  (payload: Me) => ({ payload })
);

export const LoadSecurityFailed = createAction(
  SecurityActionTypes.LOAD_SECURITY_FAILED,
  (message: string | any) => ({ message })
);

export const Update = createAction(
  SecurityActionTypes.UPDATE,
  (payload: Me) => ({ payload })
);

export const UpdateSuccess = createAction(
  SecurityActionTypes.UPDATE_SUCCESS,
  (payload: Me) => ({ payload })
);

export const UpdateFailed = createAction(
  SecurityActionTypes.UPDATE_FAILED,
  (message: string | any) => ({ message })
);

const profileActions = union({
  LoadSecurity,
  LoadSecuritySuccess,
  LoadSecurityFailed,
  Update,
  UpdateSuccess,
  UpdateFailed
});

export type MeActions = typeof profileActions;
