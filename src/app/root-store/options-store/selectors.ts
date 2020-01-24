import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';

import { EnumsResponse } from '../../shared/interfaces/enums.interface';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

const getOptions = (state: State): EnumsResponse => state.values;

export const selectMyFeatureState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('options');

export const selectMyFeatureError: MemoizedSelector<
  object,
  any
> = createSelector(selectMyFeatureState, getError);

export const selectMyFeatureIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(selectMyFeatureState, getIsLoading);

export const selectMyFeatureOptions: MemoizedSelector<
  object,
  EnumsResponse
> = createSelector(selectMyFeatureState, getOptions);
