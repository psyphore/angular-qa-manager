import { Person } from '@shared/interfaces/person.interface';

export enum ActionTypes {
  LOAD_PEOPLE_REQUEST = '[People] Load Request',
  LOAD_PEOPLE_FAILURE = '[People] Load Failure',
  LOAD_PEOPLE_SUCCESS = '[People] Load Success'
}

export class LoadPeople {
  static readonly type = ActionTypes.LOAD_PEOPLE_REQUEST;
}

export class LoadPeopleFailure {
  static readonly type = ActionTypes.LOAD_PEOPLE_FAILURE;
  constructor(public message: string) { }
}

export class LoadPeopleSuccess {
  static readonly type = ActionTypes.LOAD_PEOPLE_SUCCESS;
  constructor(public payload: Person[]) { }
}
