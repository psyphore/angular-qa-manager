import { createFeatureSelector } from '@ngrx/store';
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
