import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PersonState } from './person.state';

export const selectPersonState = createFeatureSelector<PersonState>('person');

export const fetchPeople = createSelector(selectPersonState, state =>
  Object.values(state.entities)
);

export const fetchPerson = createSelector(
  selectPersonState,
  state => state.entity
);
