import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

const getUser = (state: State): string => state.token;

export const selectMyFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('signIn');

export const selectMyFeatureError: MemoizedSelector<
  object,
  any
> = createSelector(selectMyFeatureState, getError);

export const selectMyFeatureIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectMyFeatureState, getIsLoading);

export const selectMyFeatureUser: MemoizedSelector<
  object,
  string
> = createSelector(selectMyFeatureState, getUser);
