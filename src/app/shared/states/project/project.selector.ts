import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectState } from './project.state';

export const selectProjectState = createFeatureSelector<ProjectState>(
  'project'
);

export const fetchAllReleases = createSelector(selectProjectState, state =>
  Object.values(state.releases)
);

export const fetchARelease = createSelector(
  selectProjectState,
  state => state.release
);

export const fetchAllIssues = createSelector(
  selectProjectState,
  state => state.issues
);

export const fetchAnIssue = createSelector(
  selectProjectState,
  state => state.issue
);

export const fetchAllOptions = createSelector(
  selectProjectState,
  state => state.options
);
