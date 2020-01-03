import { createFeatureSelector } from '@ngrx/store';
import { EnumsState, enumsAdapter } from './project.state';

export const selectEnumsState = createFeatureSelector<EnumsState>('enums');

export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll
} = enumsAdapter.getSelectors(selectEnumsState);
