import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
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

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_ME_REQUEST
    ),
    startWith(new featureActions.LoadRequestAction()),
    switchMap(action =>
      this.dataService.me().pipe(
        map(
          response =>
            new featureActions.LoadSuccessAction({ profile: response })
        ),
        catchError(error => of(new featureActions.LoadFailureAction({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  loadRequestSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadSuccessAction>(
      featureActions.ActionTypes.LOAD_ME_SUCCESS
    ),
    startWith(new featureActions.LoadSuccessAction(<any>{})),
    tap(action => {
      console.log('> Auth Success Effect', action);
      this.snackBar.open('SUCCESS', 'Profile operation was a success', {
        duration: this.snackBarDuration
      });
    })
  );

  @Effect({ dispatch: false })
  loadRequestFailedEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadFailureAction>(
      featureActions.ActionTypes.LOAD_ME_FAILURE
    ),
    startWith(new featureActions.LoadFailureAction(<any>{})),
    tap(action => {
      console.log('> Profile Failure Effect', action);
      this.snackBar.open('FAILED', `Profile operation failed`, {
        duration: this.snackBarDuration
      });
    })
  );
}
