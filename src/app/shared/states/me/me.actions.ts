import { createAction, union } from '@ngrx/store';

import { Me } from '@models/security.interface';
import { MeActionTypes } from '@enums/me.enum';
export const LoadMe = createAction(MeActionTypes.LOAD);

export const LoadMeSuccess = createAction(
  MeActionTypes.LOAD_SUCCESS,
  (payload: Me) => ({ payload })
);

export const LoadMeFailed = createAction(
  MeActionTypes.LOAD_FAILED,
  (message: string | any) => ({ message })
);

export const Update = createAction(MeActionTypes.UPDATE, (payload: Me) => ({
  payload
}));

export const UpdateSuccess = createAction(
  MeActionTypes.UPDATE_SUCCESS,
  (payload: Me) => ({ payload })
);

export const UpdateFailed = createAction(
  MeActionTypes.UPDATE_FAILED,
  (message: string | any) => ({ message })
);

const profileActions = union({
  LoadMe,
  LoadMeSuccess,
  LoadMeFailed,
  Update,
  UpdateSuccess,
  UpdateFailed
});

export type MeActions = typeof profileActions;
