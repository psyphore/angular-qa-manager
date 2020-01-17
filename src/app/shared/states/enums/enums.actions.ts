import { EnumsResponse } from '@models/enums.interface';

import { createAction, union } from '@ngrx/store';
import { EnumsActionTypes } from '@shared/enums/enums.enum';

export const LoadOptions = createAction(EnumsActionTypes.LOAD_OPTIONS);

export const LoadOptionsSuccess = createAction(
  EnumsActionTypes.LOAD_OPTIONS_SUCCESS,
  (payload: EnumsResponse) => ({ payload })
);
export const LoadOptionsFailed = createAction(
  EnumsActionTypes.LOAD_OPTIONS_FAILED,
  (message: any) => ({ message })
);

const actions = union({ LoadOptions, LoadOptionsSuccess, LoadOptionsFailed });

export type EnumsActions = typeof actions;
