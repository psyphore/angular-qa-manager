export enum System {
  iPlatformSMA = 1,
  iPlatformConfigurable = 2,
  connect = 3,
  digital = 4,
  flexi = 5,
  cims360 = 6,
  qRater = 7,
  configuration = 8,
  other = 9
}

export enum Environment {
  production = 1,
  uat = 2,
  preProduction = 3,
  demo = 4,
  staging = 5
}

export enum ProjectActionTypes {
  ADD = '[Project] Add',
  ADD_SUCCESS = '[Project] Add success',
  ADD_FAILED = '[Project] Add failed',
  LOAD_PROJECTS = '[Project] Load Project',
  LOAD_PROJECTS_SUCCESS = '[Project] Load Project success',
  LOAD_PROJECTS_FAILED = '[Project] Load Project failed',
  UPDATE = '[Project] Update',
  UPDATE_SUCCESS = '[Project] Update success',
  UPDATE_FAILED = '[Project] Update failed',
  DELETE = '[Project] Delete',
  DELETE_SUCCESS = '[Project] Delete success',
  DELETE_FAILED = '[Project] Delete failed',
  LOAD_OPTIONS = '[Project] load options',
  LOAD_OPTIONS_SUCCESS = '[Project] load options success',
  LOAD_OPTIONS_FAILED = '[Project] load options failed'
}
