import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PersonState } from './person.state';

export const selectPersonState = createFeatureSelector<PersonState>('person');

export const selectAll = createSelector(
  selectPersonState,
  state => Object.values(state.entities)
);
