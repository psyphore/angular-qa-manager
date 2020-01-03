import { createFeatureSelector } from '@ngrx/store';

import { PersonState, personAdapter } from './person.state';

export const selectPersonState = createFeatureSelector<PersonState>('person');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = personAdapter.getSelectors(selectPersonState);
