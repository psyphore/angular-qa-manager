export enum Person {
  ADMIN = 'Admin',
  DEV = 'Developer',
  QA = 'Lead QA'
}

export enum PersonActionTypes {
  LOAD_PERSONS = '[People] Load Person',
  LOAD_PERSONS_SUCCESS = '[People] Load Person success',
  LOAD_PERSONS_FAILED = '[People] Load Person failed',

  LOAD_PERSON = '[Person] Load Person',
  LOAD_PERSON_SUCCESS = '[Person] Load Person success',
  LOAD_PERSON_FAILED = '[Person] Load Person failed'
}
