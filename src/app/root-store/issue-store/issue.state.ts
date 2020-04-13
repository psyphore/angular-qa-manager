import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  IssueItem,
  IssueItemSuccess,
  IssueItemFailure,
  IssueItemAdd,
  IssueItemAddSuccess,
  IssueItemAddFailure,
  IssueItemUpdate,
  IssueItemUpdateSuccess,
  IssueItemUpdateFailure,
  IssueItemDelete,
  IssueItemDeleteSuccess,
  IssueItemDeleteFailure,
  IssueItemsSuccess,
} from './issue.actions';

import { Issue } from '@shared/interfaces/issue.interface';
import { IssuesService } from '@shared/services';

export interface IssueStateModel {
  issue: Issue;
  issues: Issue[];
  isLoading?: boolean;
  error?: any;
}

const initialStateModel: IssueStateModel = {
  issue: null,
  issues: null,
  isLoading: false,
  error: null
};

@State<IssueStateModel>({
  name: 'issue',
  defaults: initialStateModel
})
export class IssueState {
  private snackBarDuration = 2000;
  constructor(
    private issueService: IssuesService,
    private snackBar: MatSnackBar
  ) { }

  @Selector()
  static getIssue(state: IssueStateModel) {
    return state.issue;
  }

  @Selector()
  static getIssues(state: IssueStateModel) {
    return state.issues;
  }

  @Selector()
  static getErrors(state: IssueStateModel) {
    return state.error;
  }

  @Selector()
  static isLoading(state: IssueStateModel) {
    return state.isLoading;
  }

  @Action(IssueItem, { cancelUncompleted: true })
  fetchIssue(
    { patchState, dispatch }: StateContext<IssueStateModel>,
    { payload }: IssueItem
  ) {
    patchState({ isLoading: true });
    this.issueService.getIssueById(payload).pipe(
      tap(response => dispatch(new IssueItemSuccess(response.issue))),
      catchError(error => of(new IssueItemFailure(error.message)))
    );
  }

  @Action(IssueItemAdd, { cancelUncompleted: true })
  addIssue(
    { patchState, dispatch }: StateContext<IssueStateModel>,
    { payload }: IssueItemAdd
  ) {
    patchState({ isLoading: true });
    this.issueService.addIssue(payload).pipe(
      tap(response => dispatch(new IssueItemAddSuccess(response.issue))),
      catchError(error => of(new IssueItemAddFailure(error.message)))
    );
  }

  @Action(IssueItemUpdate, { cancelUncompleted: true })
  updateIssue(
    { patchState, dispatch }: StateContext<IssueStateModel>,
    { payload }: IssueItemUpdate
  ) {
    patchState({ isLoading: true });
    this.issueService.updateIssue(payload).pipe(
      tap(response => dispatch(new IssueItemUpdateSuccess(response.issue))),
      catchError(error => of(new IssueItemUpdateFailure(error.message)))
    );
  }

  @Action(IssueItemDelete, { cancelUncompleted: true })
  deleteIssue(
    { patchState, dispatch }: StateContext<IssueStateModel>,
    { payload }: IssueItemDelete
  ) {
    patchState({ isLoading: true });
    this.issueService.deleteIssue(payload).pipe(
      tap(response => dispatch(new IssueItemDeleteSuccess(response.issue))),
      catchError(error => of(new IssueItemFailure(error.message)))
    );
  }

  @Action([IssueItemAddSuccess, IssueItemUpdateSuccess, IssueItemDeleteSuccess])
  issueActionSuccess(
    { dispatch }: StateContext<IssueStateModel>,
    { payload }: IssueItemAddSuccess | IssueItemUpdateSuccess | IssueItemDeleteSuccess
  ) {
    return dispatch(new IssueItem(+payload.id));
  }

  @Action([IssueItemsSuccess])
  issuesSuccess(
    { patchState }: StateContext<IssueStateModel>,
    { payload }: IssueItemsSuccess
  ) {
    patchState({ issues: payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'Issue operation is a success', {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }

  @Action([IssueItemSuccess])
  issueSuccess(
    { patchState }: StateContext<IssueStateModel>,
    { payload }: IssueItemSuccess
  ) {
    patchState({ issue: payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'Issue operation is a success', {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }

  @Action([IssueItemAddFailure, IssueItem, IssueItemFailure, IssueItemDeleteFailure])
  issueFailed(
    { patchState }: StateContext<IssueStateModel>,
    { message }: IssueItemFailure | IssueItemAddFailure | IssueItemUpdateFailure | IssueItemDeleteFailure
  ) {
    patchState({ isLoading: false, error: message });
    this.snackBar.open('FAILED', `Issue operation failed`, {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }
}
