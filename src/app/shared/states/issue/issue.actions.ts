import { createAction, union } from '@ngrx/store';

import { Issue, IssueUpdate } from '@models/issue.interface';
import { IssueActionTypes } from '@enums/issue.enum';

export const Create = createAction(IssueActionTypes.ADD, (payload: Issue) => ({
  payload
}));

export const CreateSuccess = createAction(
  IssueActionTypes.ADD_SUCCESS,
  (payload: IssueUpdate) => ({ payload })
);
export const CreateFailed = createAction(
  IssueActionTypes.ADD_FAILED,
  (message: string | any) => ({ message })
);

export const Update = createAction(
  IssueActionTypes.UPDATE,
  (payload: Issue) => ({
    payload
  })
);

export const UpdateSuccess = createAction(
  IssueActionTypes.UPDATE_SUCCESS,
  (payload: IssueUpdate) => ({ payload })
);

export const UpdateFailed = createAction(
  IssueActionTypes.UPDATE_FAILED,
  (message: string | any) => ({ message })
);

export const Load = createAction(
  IssueActionTypes.LOAD_ISSUES,
  (issueId: any, start: number, limit: number) => ({
    issueId,
    start,
    limit
  })
);

export const LoadSuccess = createAction(
  IssueActionTypes.UPDATE_SUCCESS,
  (payload: Issue[]) => ({ payload })
);

export const LoadFailed = createAction(
  IssueActionTypes.UPDATE_FAILED,
  (message: string | any) => ({ message })
);

export const LoadOne = createAction(
  IssueActionTypes.LOAD_ISSUE,
  (payload: any) => ({
    payload
  })
);

export const LoadOneSuccess = createAction(
  IssueActionTypes.LOAD_ISSUE_SUCCESS,
  (payload: Issue) => ({ payload })
);

export const LoadOneFailed = createAction(
  IssueActionTypes.LOAD_ISSUE_FAILED,
  (message: string | any) => ({ message })
);

const actions = union({
  Create,
  CreateSuccess,
  CreateFailed,
  Update,
  UpdateSuccess,
  UpdateFailed,
  Load,
  LoadSuccess,
  LoadFailed,
  LoadOne,
  LoadOneSuccess,
  LoadOneFailed
});

export type IssueActions = typeof actions;
