import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
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

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActions.LogIn),
      exhaustMap((action: any) =>
        this.authSvc.signIn(action.payload).pipe(
          map((result: any) => SecurityActions.LogInSuccess(result)),
          catchError(error => of(SecurityActions.LogInFailed(error.message)))
        )
      )
    )
  );

  logInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActions.LogInSuccess),
        tap((action: any) => {
          console.log('> Sign in success', action);
          this.authSvc.addSessionItem('id_token', action.payload.login.jwt);
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  logInFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActions.LogInFailed),
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
      ),
    { dispatch: false }
  );
  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActions.LogOut),
      tap(() => {
        try {
          this.authSvc.removeSessionItem('id_token');
          return SecurityActions.LogOutSuccess();
        } catch (error) {
          return SecurityActions.LogOutFailed(error);
        }
      })
    )
  );

  logOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActions.LogOutSuccess),
        tap(() => {
          this.authSvc.removeSessionItem('id_token');
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  logOutFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActions.LogOutFailed),
        tap(() => {
          this.authSvc.removeSessionItem('id_token');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.SECURITY_ACTIONS_SUCCESS),
        tap(() => {
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  failure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.SECURITY_ACTIONS_FAILED),
        tap(() => {
          this.snackBar.open('FAILED', 'Operation failed', {
            duration: this.snackBarDuration
          });
        })
      ),
    { dispatch: false }
  );
}
