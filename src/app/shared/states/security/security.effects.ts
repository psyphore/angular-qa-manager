import { Actions, ofType, Effect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as SecurityActions from '@states/security/security.actions';
import { AuthService } from '@services/security.service';
import { SecurityActionTypes } from '@enums/security.enum';

@Injectable()
export class SecurityEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private authSvc: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  SECURITY_ACTIONS_SUCCESS = [
    SecurityActionTypes.SIGN_IN_SUCCESS,
    SecurityActionTypes.SIGN_OUT_SUCCESS
  ];

  SECURITY_ACTIONS_FAILED = [
    SecurityActionTypes.SIGN_IN_FAILED,
    SecurityActionTypes.SIGN_OUT_FAILED
  ];

  @Effect()
  login$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN),
    exhaustMap((action: any) =>
      this.authSvc.signIn(action.payload).pipe(
        map((result: any) => new SecurityActions.LogInSuccess(result)),
        catchError(error => of(new SecurityActions.LogInFailed(error.message)))
      )
    )
  );

  @Effect({ dispatch: false })
  logInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN_SUCCESS),
    tap((action: any) => {
      console.log('> Sign in success', action);
      this.authSvc.addSessionItem('id_token', action.payload.login.jwt);
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  logInFailed$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN_FAILED),
    tap((error: any) => {
      console.error('X failed to auth', error);
      this.authSvc.removeSessionItem('id_token');
      this.snackBar.open(
        'FAILED',
        `Operation failed ${error.message.message}`,
        {
          duration: this.snackBarDuration
        }
      );
      this.router.navigate(['security/signin']);
    })
  );

  @Effect()
  logOut$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT),
    tap(() => {
      try {
        this.authSvc.removeSessionItem('id_token');
        return new SecurityActions.LogOutSuccess();
      } catch (error) {
        return new SecurityActions.LogOutFailed(error);
      }
    })
  );

  @Effect({ dispatch: false })
  logOutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT_SUCCESS),
    tap(() => {
      this.authSvc.removeSessionItem('id_token');
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  logOutFailed$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT_FAILED),
    tap(() => {
      this.authSvc.removeSessionItem('id_token');
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  success$: Observable<any> = this.actions$.pipe(
    ofType(...this.SECURITY_ACTIONS_SUCCESS),
    tap(() => {
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  failure$: Observable<any> = this.actions$.pipe(
    ofType(...this.SECURITY_ACTIONS_FAILED),
    tap(() => {
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: this.snackBarDuration
      });
    })
  );
}
