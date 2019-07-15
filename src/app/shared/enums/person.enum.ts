export enum Person {
  ADMIN = 'Admin',
  DEV = 'Developer',
  QA = 'Lead QA'
}

export enum PersonActionTypes {
  ADD = '[Person] Add',
  ADD_SUCCESS = '[Person] Add success',
  ADD_FAILED = '[Person] Add failed',
  LOAD_PERSONS = '[Person] Load Person',
  LOAD_PERSONS_SUCCESS = '[Person] Load Person success',
  LOAD_PERSONS_FAILED = '[Person] Load Person failed',
  UPDATE = '[Person] Update',
  UPDATE_SUCCESS = '[Person] Update success',
  UPDATE_FAILED = '[Person] Update failed',
  DELETE = '[Person] Delete',
  DELETE_SUCCESS = '[Person] Delete success',
  DELETE_FAILED = '[Person] Delete failed'
}
