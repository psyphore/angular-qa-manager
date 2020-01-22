import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { AuthService } from '../../shared/services/security.service';
import * as featureActions from './actions';
import { SignInCredentials } from '../../shared/interfaces/security.interface';

@Injectable()
export class SignInStoreEffects {
  constructor(private dataService: AuthService, private actions$: Actions) {}

  @Effect()
  loadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadRequestAction>(
      featureActions.ActionTypes.LOAD_REQUEST
    ),
    startWith(new featureActions.LoadRequestAction(<SignInCredentials>{})),
    switchMap(action =>
      this.dataService.signIn(action.payload).pipe(
        map(response => new featureActions.LoadSuccessAction(response)),
        catchError(error =>
          observableOf(new featureActions.LoadFailureAction({ error }))
        )
      )
    )
  );
}
