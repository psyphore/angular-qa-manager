import {
  Issue,
  IssueUpdate
} from '@shared/interfaces/issue.interface';

export enum IssueActionTypes {
  ISSUE_REQUEST = '[Issue] Request',
  ISSUE_FAILURE = '[Issue] Failure',
  ISSUE_SUCCESS = '[Issue] Success',

  ISSUE_ADD = '[Issue] Add',
  ISSUE_ADD_FAILURE = '[Issue] Add Failure',
  ISSUE_ADD_SUCCESS = '[Issue] Add Success',

  ISSUE_UPDATE = '[Issue] Update',
  ISSUE_UPDATE_FAILURE = '[Issue] Update Failure',
  ISSUE_UPDATE_SUCCESS = '[Issue] Update Success',

  ISSUE_DELETE = '[Issue] Delete',
  ISSUE_DELETE_FAILURE = '[Issue] Delete Failure',
  ISSUE_DELETE_SUCCESS = '[Issue] Delete Success',

  ISSUES_REQUEST = '[Issues] Request',
  ISSUES_SUCCESS = '[Issues] Success',
  ISSUES_FAILURE = '[Issues] Failure'
}

export class IssueItems {
  static readonly type = IssueActionTypes.ISSUES_REQUEST;
  constructor(public payload: { limit: number, start: number } = { limit: 10, start: 0 }) { }
}

export class IssueItemsSuccess {
  static readonly type = IssueActionTypes.ISSUES_SUCCESS;
  constructor(public payload: Issue[]) { }
}

export class IssueItemsFailure {
  static readonly type = IssueActionTypes.ISSUES_FAILURE;
  constructor(public message: string) { }
}


export class IssueItem {
  static readonly type = IssueActionTypes.ISSUE_REQUEST;
  constructor(public payload: number) { }
}

export class IssueItemSuccess {
  static readonly type = IssueActionTypes.ISSUE_SUCCESS;
  constructor(public payload: Issue) { }
}

export class IssueItemFailure {
  static readonly type = IssueActionTypes.ISSUE_FAILURE;
  constructor(public message: string) { }
}


export class IssueItemAdd {
  static readonly type = IssueActionTypes.ISSUE_SUCCESS;
  constructor(public payload: Issue) { }
}


export class IssueItemAddSuccess {
  static readonly type = IssueActionTypes.ISSUE_ADD_SUCCESS;
  constructor(public payload: IssueUpdate) { }
}


export class IssueItemAddFailure {
  static readonly type = IssueActionTypes.ISSUE_ADD_FAILURE;
  constructor(public message: string) { }
}

export class IssueItemUpdate {
  static readonly type = IssueActionTypes.ISSUE_UPDATE;
  constructor(public payload: Issue) { }
}

export class IssueItemUpdateSuccess {
  static readonly type = IssueActionTypes.ISSUE_UPDATE_SUCCESS;
  constructor(public payload: IssueUpdate) { }
}

export class IssueItemUpdateFailure {
  static readonly type = IssueActionTypes.ISSUE_UPDATE_FAILURE;
  constructor(public message: string) { }
}

export class IssueItemDelete {
  static readonly type = IssueActionTypes.ISSUE_DELETE;
  constructor(public payload: number) { }
}

export class IssueItemDeleteSuccess {
  static readonly type = IssueActionTypes.ISSUE_DELETE_SUCCESS;
  constructor(public payload: IssueUpdate) { }
}

export class IssueItemDeleteFailure {
  static readonly type = IssueActionTypes.ISSUE_DELETE_FAILURE;
  constructor(public message: string) { }
}

