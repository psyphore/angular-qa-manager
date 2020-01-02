import { Action } from '@ngrx/store';
import { PersonActionTypes } from '@enums/person.enum';
import { Person } from '@models/person.interface';

export class LoadPeople implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS;

  constructor() {}
}

export class LoadPeopleSuccess implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS_SUCCESS;

  constructor(public payload: Array<Person>) {}
}
export class LoadPeopleFailed implements Action {
  readonly type = PersonActionTypes.LOAD_PERSONS_FAILED;

  constructor(public message: string) {}
}

export class LoadPerson implements Action {
  readonly type = PersonActionTypes.LOAD_PERSON;

  constructor() {}
}

export class LoadPersonSuccess implements Action {
  readonly type = PersonActionTypes.LOAD_PERSON_SUCCESS;

  constructor(public payload: Person) {}
}
export class LoadPersonFailed implements Action {
  readonly type = PersonActionTypes.LOAD_PERSON_FAILED;

  constructor(public message: string) {}
}

export type PersonActions =
  | LoadPersonSuccess
  | LoadPerson
  | LoadPersonFailed
  | LoadPeople
  | LoadPeopleFailed
  | LoadPeopleSuccess;
