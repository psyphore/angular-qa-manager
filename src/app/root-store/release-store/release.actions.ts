import {
  Release,
  ReleaseUpdate
} from '@shared/interfaces/release.interface';

export enum ReleaseActionTypes {
  RELEASE_REQUEST = '[Release] Request',
  RELEASE_FAILURE = '[Release] Failure',
  RELEASE_SUCCESS = '[Release] Success',

  RELEASE_ADD = '[Release] Add',
  RELEASE_ADD_FAILURE = '[Release] Add Failure',
  RELEASE_ADD_SUCCESS = '[Release] Add Success',

  RELEASE_UPDATE = '[Release] Update',
  RELEASE_UPDATE_FAILURE = '[Release] Update Failure',
  RELEASE_UPDATE_SUCCESS = '[Release] Update Success',

  RELEASE_DELETE = '[Release] Delete',
  RELEASE_DELETE_FAILURE = '[Release] Delete Failure',
  RELEASE_DELETE_SUCCESS = '[Release] Delete Success',

  RELEASES_REQUEST = '[Releases] Request',
  RELEASES_FAILURE = '[Releases] Failure',
  RELEASES_SUCCESS = '[Releases] Success'
}

export class ReleaseItemAdd {
  static readonly type = ReleaseActionTypes.RELEASE_ADD;
  constructor(public payload: Release) { }
}

export class ReleaseItemAddSuccess {
  static readonly type = ReleaseActionTypes.RELEASE_ADD_SUCCESS;
  constructor(public payload: ReleaseUpdate) { }
}

export class ReleaseItemAddFailure {
  static readonly type = ReleaseActionTypes.RELEASE_ADD_FAILURE;
  constructor(public message: string) { }
}

export class ReleaseUpdateItem {
  static readonly type = ReleaseActionTypes.RELEASE_UPDATE;
  constructor(public payload: Release) { }
}

export class ReleaseUpdateItemSuccess {
  static readonly type = ReleaseActionTypes.RELEASE_UPDATE_SUCCESS;
  constructor(public payload: ReleaseUpdate) { }
}

export class ReleaseUpdateItemFailure {
  static readonly type = ReleaseActionTypes.RELEASE_UPDATE_FAILURE;
  constructor(public message: string) { }
}

export class ReleaseItem {
  static readonly type = ReleaseActionTypes.RELEASE_REQUEST;
  constructor(public payload: number) { }
}

export class ReleaseItemSuccess {
  static readonly type = ReleaseActionTypes.RELEASE_SUCCESS;
  constructor(public payload: Release) { }
}

export class ReleaseItemFailure {
  static readonly type = ReleaseActionTypes.RELEASE_FAILURE;
  constructor(public message: string) { }
}

export class ReleaseDeleteItem {
  static readonly type = ReleaseActionTypes.RELEASE_DELETE;
  constructor(public payload: Release) { }
}

export class ReleaseDeleteItemSuccess {
  static readonly type = ReleaseActionTypes.RELEASE_DELETE_SUCCESS;
  constructor(public payload: ReleaseUpdate) { }
}

export class ReleaseDeleteItemFailure {
  static readonly type = ReleaseActionTypes.RELEASE_DELETE_FAILURE;
  constructor(public message: string) { }
}

export class ReleaseItems {
  static readonly type = ReleaseActionTypes.RELEASES_REQUEST;
  constructor(
    public payload: { limit: number; start: number } = { limit: 10, start: 1 }
  ) { }
}

export class ReleaseItemsSuccess {
  static readonly type = ReleaseActionTypes.RELEASES_SUCCESS;
  constructor(public payload: Release[]) { }
}

export class ReleaseItemsFailure {
  static readonly type = ReleaseActionTypes.RELEASES_FAILURE;
  constructor(public message: string) { }
}
