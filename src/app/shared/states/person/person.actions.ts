import { Action } from '@ngrx/store';
import { PersonActionTypes } from '../../enums/person.enum';
import { Person } from '../../interfaces/person.interface';

export class LoadPerson implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS;

  constructor() {}
}

export class LoadPersonSuccess implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS_SUCCESS;

  constructor(public payload: Array<Person>) {}
}
export class LoadPersonFailed implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS_FAILED;

  constructor(public message: string) {}
}

export class Add implements Action {
  readonly type = PersonActionTypes.ADD;

  constructor(public person: Person) {}
}

export class AddSuccess implements Action {
  readonly type = PersonActionTypes.ADD_SUCCESS;

  constructor(public person: Person) {}
}
export class AddFailed implements Action {
  readonly type = PersonActionTypes.ADD_FAILED;

  constructor(public message: string) {}
}

export class Delete implements Action {
  readonly type = PersonActionTypes.DELETE;

  constructor(public id: number) {}
}
export class DeleteSuccess implements Action {
  readonly type = PersonActionTypes.DELETE_SUCCESS;

  constructor(public id: number) {}
}
export class DeleteFailed implements Action {
  readonly type = PersonActionTypes.DELETE_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  readonly type = PersonActionTypes.UPDATE;

  constructor(public person: Person) {}
}
export class UpdateSuccess implements Action {
  readonly type = PersonActionTypes.UPDATE_SUCCESS;

  constructor(public person: Person) {}
}
export class UpdateFailed implements Action {
  readonly type = PersonActionTypes.UPDATE_FAILED;

  constructor(public message: string) {}
}

export type PersonActions =
  | LoadPersonSuccess
  | Add
  | AddSuccess
  | AddFailed
  | Delete
  | DeleteSuccess
  | DeleteFailed
  | Update
  | UpdateSuccess
  | UpdateFailed;
