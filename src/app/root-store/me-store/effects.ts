import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/security.service';
import * as featureActions from './actions';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MeStoreEffects {
  private snackBarDuration = 2000;
  constructor(
    private dataService: AuthService,
    private actions$: Actions,
    private snackBar: MatSnackBar
  ) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.loadProfile),
      tap(() => console.log('> load profile')),
      switchMap(() =>
        this.dataService.me().pipe(
          map(response => featureActions.loadProfileSuccess(response)),
          catchError(error => of(featureActions.loadProfileFailure(error)))
        )
      )
    )
  );

  loadProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.loadProfileSuccess),
        tap(() =>
          this.snackBar.open('SUCCESS', 'Profile operation was a success', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );

  loadProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.loadProfileFailure),
        tap(() =>
          this.snackBar.open('FAILED', `Profile operation failed`, {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );
}
