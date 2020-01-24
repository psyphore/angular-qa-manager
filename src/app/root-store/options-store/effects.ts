import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
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

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_OPTIONS_REQUEST
    ),
    startWith(new featureActions.LoadRequestAction()),
    switchMap(action =>
      this.dataService.getAllOptions().pipe(
        map(response => new featureActions.LoadSuccessAction(response)),
        catchError(error => of(new featureActions.LoadFailureAction({ error })))
      )
    )
  );

  @Effect({ dispatch: false })
  loadRequestSuccessEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadSuccessAction>(
      featureActions.ActionTypes.LOAD_OPTIONS_SUCCESS
    ),
    startWith(new featureActions.LoadSuccessAction(<any>{})),
    tap(action => {
      this.snackBar.open('SUCCESS', 'Options operation was a success', {
        duration: this.snackBarDuration
      });
    })
  );

  @Effect({ dispatch: false })
  loadRequestFailedEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadFailureAction>(
      featureActions.ActionTypes.LOAD_OPTIONS_FAILURE
    ),
    startWith(new featureActions.LoadFailureAction(<any>{})),
    tap(action => {
      console.log('> Options Failure Effect', action);
      this.snackBar.open('FAILED', `Options operation failed`, {
        duration: this.snackBarDuration
      });
    })
  );
}
