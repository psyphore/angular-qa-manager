import { GeneralServices } from '@services/basic.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { EnumsResponse } from '@models/enums.interface';
import * as EnumsActions from '@states/enums/enums.actions';

@Injectable()
export class ProjectEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private utils: GeneralServices,
    public snackBar: MatSnackBar
  ) {}

  loadEnums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnumsActions.LoadOptions),
      switchMap(() =>
        this.utils.getAllOptions().pipe(
          map((response: EnumsResponse) =>
            EnumsActions.LoadOptionsSuccess(response)
          ),
          catchError(error => of(EnumsActions.LoadOptionsFailed(error)))
        )
      )
    )
  );

  successNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EnumsActions.LoadOptionsSuccess),
        tap(() =>
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );

  failedNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EnumsActions.LoadOptionsFailed),
        tap(() =>
          this.snackBar.open('FAILED', 'Operation failed', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );
}
