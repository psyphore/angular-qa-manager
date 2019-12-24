import { Action } from '@ngrx/store';
import { Project } from '@models/project.interface';
import { ProjectActionTypes } from '@shared/enums/project.enum';

export class LoadProject implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS;

  constructor() {}
}

export class LoadProjectSuccess implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_SUCCESS;

  constructor(public payload: Array<Project>) {}
}

export class LoadProjectFailed implements Action {
  readonly type = ProjectActionTypes.LOAD_PROJECTS_FAILED;

  constructor(public message: string) {}
}

export class Add implements Action {
  readonly type = ProjectActionTypes.ADD;

  constructor(public project: Project) {}
}

export class AddSuccess implements Action {
  readonly type = ProjectActionTypes.ADD_SUCCESS;

  constructor(public project: Project) {}
}

export class AddFailed implements Action {
  readonly type = ProjectActionTypes.ADD_FAILED;

  constructor(public message: string) {}
}

export class Delete implements Action {
  readonly type = ProjectActionTypes.DELETE;

  constructor(public id: number) {}
}

export class DeleteSuccess implements Action {
  readonly type = ProjectActionTypes.DELETE_SUCCESS;

  constructor(public id: number) {}
}

export class DeleteFailed implements Action {
  readonly type = ProjectActionTypes.DELETE_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  readonly type = ProjectActionTypes.UPDATE;

  constructor(public project: Project) {}
}

export class UpdateSuccess implements Action {
  readonly type = ProjectActionTypes.UPDATE_SUCCESS;

  constructor(public project: Project) {}
}

export class UpdateFailed implements Action {
  readonly type = ProjectActionTypes.UPDATE_FAILED;

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
  | UpdateFailed;