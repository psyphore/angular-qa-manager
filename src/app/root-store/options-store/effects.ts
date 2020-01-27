import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { GeneralServices } from '../../shared/services/basic.service';
import * as featureActions from './actions';

@Injectable()
export class OptionsStoreEffects {
  private snackBarDuration = 2000;
  constructor(
    private dataService: GeneralServices,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {}

  loadOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadOptions),
      tap(() => console.log('> load options')),
      switchMap(() =>
        this.dataService.getAllOptions().pipe(
          map(response => featureActions.loadOptionsSuccess(response)),
          catchError(error => of(featureActions.loadOptionsFailure({ error })))
        )
      )
    )
  );

  loadOptionsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.loadOptionsSuccess),
        tap(() =>
          this.snackBar.open('SUCCESS', 'Options operation was a success', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );

  loadOptionsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.loadOptionsFailure),
        tap(error =>
          this.snackBar.open('FAILED', `Options operation failed ${error}`, {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );
}
