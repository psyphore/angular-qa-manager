import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SecurityState, securityAdapter } from './security.state';

export const selectSecurityState = createFeatureSelector<SecurityState>(
  'security'
);

export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll
} = securityAdapter.getSelectors(selectSecurityState);

export const selectAuthToken = createSelector(
  selectSecurityState,
  (state: SecurityState) => state.entities
);
