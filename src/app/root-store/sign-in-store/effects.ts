import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, exhaustMap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../shared/services/security.service';
import * as featureActions from './actions';

@Injectable()
export class SignInStoreEffects {
  private snackBarDuration = 2000;
  constructor(
    private dataService: AuthService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  signInRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(featureActions.signInRequest),
      tap(() => console.log('> authenticate')),
      mergeMap(action =>
        this.dataService.signIn(action.payload).pipe(
          map(response => {
            console.log('> Authenticated', response);
            return featureActions.signInRequestSuccess(response);
          }),
          catchError(error =>
            of(featureActions.signInRequestFailure(error.message))
          )
        )
      )
    )
  );

  signInRequestSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.signInRequestSuccess),
        tap(() => {
          this.snackBar.open('SUCCESS', 'SignIn operation is a success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  signInRequestFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(featureActions.signInRequestFailure),
        tap(() => {
          this.snackBar.open('FAILED', `SignIn operation failed`, {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/signin']);
        })
      ),
    { dispatch: false }
  );
}
