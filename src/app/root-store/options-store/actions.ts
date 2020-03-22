import { Action, createAction, props, union } from '@ngrx/store';
import { EnumsResponse } from '../../shared/interfaces/enums.interface';

export enum ActionTypes {
  LOAD_OPTIONS_REQUEST = '[Options] Load Request',
  LOAD_OPTIONS_FAILURE = '[Options] Load Failure',
  LOAD_OPTIONS_SUCCESS = '[Options] Load Success'
}

export const loadOptions = createAction(ActionTypes.LOAD_OPTIONS_REQUEST);

export const loadOptionsFailure = createAction(
  ActionTypes.LOAD_OPTIONS_FAILURE,
  (errorMessage = 'Error Loading Options') => ({ payload: { errorMessage } })
);

export const loadOptionsSuccess = createAction(
  ActionTypes.LOAD_OPTIONS_SUCCESS,
  (payload: EnumsResponse) => ({ payload })
);

const actions = union({
  loadOptions,
  loadOptionsFailure,
  loadOptionsSuccess
});

export type Actions = typeof actions;
