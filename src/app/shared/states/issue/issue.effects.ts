import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { IssuesService } from '@services/issues.service';
import * as IssueActions from '@states/issue/issue.actions';

@Injectable()
export class ProjectEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private issuesService: IssuesService,
    public snackBar: MatSnackBar
  ) {}

  loadAllIssues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.Load),
      exhaustMap((action: any) =>
        this.issuesService.getAllIssues(action.limit, action.start).pipe(
          map((result: any) => IssueActions.LoadSuccess(result)),
          catchError(error => of(IssueActions.LoadFailed(error.message)))
        )
      )
    )
  );

  loadAnIssue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IssueActions.LoadOne),
      exhaustMap((action: any) =>
        this.issuesService.getIssueById(action.payload).pipe(
          map((result: any) => IssueActions.LoadOneSuccess(result)),
          catchError(error => of(IssueActions.LoadOneFailed(error.message)))
        )
      )
    )
  );
}
