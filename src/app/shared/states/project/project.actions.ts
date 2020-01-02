import { EnumsReponse } from '@models/enums.interface';
import { Action } from '@ngrx/store';
import { Release, ReleaseUpdate } from '@models/project.interface';
import { ProjectActionTypes } from '@enums/project.enum';

export class LoadProject implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS;

  constructor() {}
}

export class LoadProjectSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_SUCCESS;

  constructor(public payload: Array<Release>) {}
}

export class LoadProjectFailed implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_FAILED;

  constructor(public message: string) {}
}

export class Add implements Action {
  readonly type = ProjectActionTypes.ADD;

  constructor(public project: Release) {}
}

export class AddSuccess implements Action {
  readonly type = ProjectActionTypes.ADD_SUCCESS;

  constructor(public project: ReleaseUpdate) {}
}

export class AddFailed implements Action {
  readonly type = ProjectActionTypes.ADD_FAILED;

  constructor(public message: string) {}
}

export class Delete implements Action {
  readonly type = ProjectActionTypes.DELETE;

  constructor(public release: Release) {}
}

export class DeleteSuccess implements Action {
  readonly type = ProjectActionTypes.DELETE_SUCCESS;

  constructor(public release: ReleaseUpdate) {}
}

export class DeleteFailed implements Action {
  readonly type = ProjectActionTypes.DELETE_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  readonly type = ProjectActionTypes.UPDATE;

  constructor(public project: Release) {}
}

export class UpdateSuccess implements Action {
  readonly type = ProjectActionTypes.UPDATE_SUCCESS;

  constructor(public project: ReleaseUpdate) {}
}

export class UpdateFailed implements Action {
  readonly type = ProjectActionTypes.UPDATE_FAILED;

  constructor(public message: string) {}
}

export class LoadOptions implements Action {
  readonly type = ProjectActionTypes.LOAD_OPTIONS;

  constructor() {}
}

export class LoadOptionsSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_OPTIONS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadOptionsFailed implements Action {
  readonly type = ProjectActionTypes.LOAD_OPTIONS_FAILED;

  constructor(public message: string) {}
}

export type ProjectActions =
  | LoadProjectSuccess
  | Add
  | AddSuccess
  | AddFailed
  | Delete
  | DeleteSuccess
  | DeleteFailed
  | Update
  | UpdateSuccess
  | UpdateFailed
  | LoadOptions
  | LoadOptionsSuccess
  | LoadOptionsFailed;
