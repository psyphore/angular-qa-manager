import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.state';

export const selectProjectState = createFeatureSelector<ProjectState>(
  'project'
);

export const selectAll = createSelector(
  selectProjectState,
  state => Object.values(state.entities)
);
