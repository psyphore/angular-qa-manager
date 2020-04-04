import {
  Release,
  ReleaseResponse,
  ReleaseUpdate,
  ReleaseUpdateResponse,
  ReleasesResponse
} from '@shared/interfaces/release.interface';
import {
  Issue,
  IssueResponse,
  IssueUpdate,
  IssueUpdateResponse,
  IssuesResponse
} from '@shared/interfaces/issue.interface';

export enum ActionTypes {
  RELEASE_REQUEST = '[Release] Request',
  RELEASE_FAILURE = '[Release] Failure',
  RELEASE_SUCCESS = '[Release] Success',

  RELEASES_REQUEST = '[Releases] Request',
  RELEASES_FAILURE = '[Releases] Failure',
  RELEASES_SUCCESS = '[Releases] Success',

  ISSUE_REQUEST = '[Issue] Request',
  ISSUE_SUCCESS = '[Issue] Success',
  ISSUE_FAILURE = '[Issue] Failure',

  ISSUES_REQUEST = '[Issues] Request',
  ISSUES_SUCCESS = '[Issues] Success',
  ISSUES_FAILURE = '[Issues] Failure'
}

export class ReleaseItem {
  static readonly type = ActionTypes.RELEASE_REQUEST;
  constructor(public payload: number) { }
}

export class ReleaseItemSuccess {
  static readonly type = ActionTypes.RELEASE_SUCCESS;
  constructor(public payload: Release) { }
}

export class ReleaseItemFailure {
  static readonly type = ActionTypes.RELEASE_FAILURE;
  constructor(public message: string) { }
}

export class ReleaseItems {
  static readonly type = ActionTypes.RELEASES_REQUEST;
  constructor(
    public payload: { limit: number; start: number } = { limit: 10, start: 1 }
  ) { }
}

export class ReleaseItemsSuccess {
  static readonly type = ActionTypes.RELEASES_SUCCESS;
  constructor(public payload: Release[]) { }
}

export class ReleaseItemsFailure {
  static readonly type = ActionTypes.RELEASES_FAILURE;
  constructor(public message: string) { }
}

export class IssueItem {
  static readonly type = ActionTypes.ISSUE_REQUEST;
  constructor(public payload: number) { }
}

export class IssueItemSuccess {
  static readonly type = ActionTypes.ISSUE_SUCCESS;
  constructor(public payload: Issue) { }
}

export class IssueItemFailure {
  static readonly type = ActionTypes.ISSUE_FAILURE;
  constructor(public message: string) { }
}
