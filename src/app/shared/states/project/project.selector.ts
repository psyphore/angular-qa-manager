import { createFeatureSelector } from '@ngrx/store';
import { ReleaseState, releaseAdapter } from './project.state';

export const selectReleaseState = createFeatureSelector<ReleaseState>(
  'release'
);

export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll
} = releaseAdapter.getSelectors(selectReleaseState);
