import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState } from './security.state';

export const selectSecurityState = createFeatureSelector<SecurityState>(
  'security'
);

export const selectAll = createSelector(selectSecurityState, state =>
  Object.values(state.entities)
);

export const selectMe = createSelector(
  selectSecurityState,
  state => state.entities
);

export const selectToken = createSelector(
  selectSecurityState,
  state => state.auth
);
