import { createFeatureSelector } from '@ngrx/store';
import { MeState, meAdapter } from './security.state';

export const selectMeState = createFeatureSelector<MeState>('me');

export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll
} = meAdapter.getSelectors(selectMeState);