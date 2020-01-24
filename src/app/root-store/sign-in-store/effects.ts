import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../shared/services/security.service';
import * as featureActions from './actions';
import { SignInCredentials } from '@shared/interfaces/security.interface';

@Injectable()
export class SignInStoreEffects {
  private snackBarDuration = 2000;

  constructor(
    private dataService: AuthService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new featureActions.LoadRequestAction(<SignInCredentials>{})),
    switchMap(action =>
      this.dataService.signIn(action.payload).pipe(
        map(response => {
          console.log('> Authenticated', response);
          return new featureActions.LoadSuccessAction(response);
        }),
        catchError(error => {
          console.error('> Not Authenticated', error);
          return of(new featureActions.LoadFailureAction({ error }));
        })
      )
    )
  );

  @Effect({ dispatch: false })
  loadRequestSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadSuccessAction>(
      featureActions.ActionTypes.LOAD_SUCCESS
    ),
    startWith(new featureActions.LoadSuccessAction(<any>{})),
    tap(action => {
      console.log('> Auth Success Effect', action);
      this.snackBar.open('SUCCESS', 'SignIn operation is a success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  loadRequestFailedEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadFailureAction>(
      featureActions.ActionTypes.LOAD_FAILURE
    ),
    startWith(new featureActions.LoadFailureAction(<any>{})),
    tap(action => {
      console.log('> Auth Failure Effect', action);
      this.snackBar.open('FAILED', `SignIn operation failed`, {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/signin']);
    })
  );
}
