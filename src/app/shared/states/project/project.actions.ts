import { union, createAction } from '@ngrx/store';
import { Release, ReleaseUpdate } from '@models/release.interface';
import { ProjectActionTypes } from '@enums/project.enum';

export const LoadRelease = createAction(
  ProjectActionTypes.LOAD_PROJECT,
  (id: any) => ({ id })
);

export const LoadReleaseSuccess = createAction(
  ProjectActionTypes.LOAD_PROJECT_SUCCESS,
  (payload: Release) => ({ payload })
);

export const LoadReleaseFailed = createAction(
  ProjectActionTypes.LOAD_PROJECT_FAILED,

  (message: string) => ({ message })
);

export const LoadReleases = createAction(
  ProjectActionTypes.LOAD_PROJECTS,
  (limit: number, start: number) => ({ limit, start })
);

export const LoadReleasesSuccess = createAction(
  ProjectActionTypes.LOAD_PROJECTS_SUCCESS,
  (payload: Array<Release>) => ({ payload })
);

export const LoadReleasesFailed = createAction(
  ProjectActionTypes.LOAD_PROJECTS_FAILED,

  (message: string) => ({ message })
);

export const AddRelease = createAction(
  ProjectActionTypes.ADD,
  (payload: Release) => ({ payload })
);

export const AddReleaseSuccess = createAction(
  ProjectActionTypes.ADD_SUCCESS,
  (payload: ReleaseUpdate) => ({ payload })
);

export const AddReleaseFailed = createAction(
  ProjectActionTypes.ADD_FAILED,
  (message: string) => ({ message })
);

export const DeleteRelease = createAction(
  ProjectActionTypes.DELETE,
  (payload: Release) => ({ payload })
);

export const DeleteReleaseSuccess = createAction(
  ProjectActionTypes.DELETE_SUCCESS,
  (payload: ReleaseUpdate) => ({ payload })
);

export const DeleteReleaseFailed = createAction(
  ProjectActionTypes.DELETE_FAILED,
  (message: string) => ({ message })
);

export const UpdateRelease = createAction(
  ProjectActionTypes.UPDATE,
  (payload: Release) => ({ payload })
);

export const UpdateReleaseSuccess = createAction(
  ProjectActionTypes.UPDATE_SUCCESS,
  (payload: ReleaseUpdate) => ({ payload })
);

export const UpdateReleaseFailed = createAction(
  ProjectActionTypes.UPDATE_FAILED,
  (message: string) => ({ message })
);

const actions = union({
  LoadReleases,
  LoadReleasesSuccess,
  LoadReleasesFailed,
  LoadRelease,
  LoadReleaseSuccess,
  LoadReleaseFailed,
  AddRelease,
  AddReleaseSuccess,
  AddReleaseFailed,
  UpdateRelease,
  UpdateReleaseSuccess,
  UpdateReleaseFailed,
  DeleteRelease,
  DeleteReleaseSuccess,
  DeleteReleaseFailed
});
export type ReleaseActions = typeof actions;
