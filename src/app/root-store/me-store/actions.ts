import { createAction, union } from '@ngrx/store';
import { Me } from '../../shared/interfaces/security.interface';

export enum ActionTypes {
  LOAD_ME_REQUEST = '[Me] Load Request',
  LOAD_ME_FAILURE = '[Me] Load Failure',
  LOAD_ME_SUCCESS = '[Me] Load Success'
}

export const loadProfile = createAction(ActionTypes.LOAD_ME_REQUEST);

export const loadProfileFailure = createAction(
  ActionTypes.LOAD_ME_FAILURE,
  (errorMessage = 'Failed to load Profile') => ({ errorMessage })
);

export const loadProfileSuccess = createAction(
  ActionTypes.LOAD_ME_SUCCESS,
  (profile: Me) => ({ profile })
);

const actions = union({
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess
});

export type Actions = typeof actions;
