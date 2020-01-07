import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as SecurityActions from '@states/security/security.actions';
import { Me, SignIn } from '@models/security.interface';
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
    SecurityActionTypes.UPDATE_SUCCESS,
    SecurityActionTypes.LOAD_SECURITY_SUCCESS
  ];

  SECURITY_ACTIONS_FAILED = [
    SecurityActionTypes.SIGN_IN_FAILED,
    SecurityActionTypes.UPDATE_FAILED,
    SecurityActionTypes.LOAD_SECURITY_FAILED
  ];

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActionTypes.SIGN_IN),
      exhaustMap((action: any) =>
        this.authSvc.signIn(action.payload).pipe(
          map((result: SignIn) =>
            SecurityActions.LogInSuccess({ payload: result })
          ),
          catchError(error =>
            of(SecurityActions.LogInFailed({ message: error.message }))
          )
        )
      )
    )
  );

  LogInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.SIGN_IN_SUCCESS),
        tap((action: any) => {
          // this.authSvc.addSessionItem('id_token', action.payload.login.jwt);
          console.log(action);
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  LogInFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.SIGN_IN_FAILED),
        tap((error: any) => {
          // this.authSvc.removeSessionItem('id_token');
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

  LoadSecurity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActionTypes.LOAD_SECURITY),
      switchMap(() => {
        return this.authSvc.me().pipe(
          map((me: Me) => ({
            type: SecurityActionTypes.LOAD_SECURITY_SUCCESS,
            payload: me
          })),
          catchError(error =>
            of({
              type: SecurityActionTypes.LOAD_SECURITY_FAILED,
              payload: error
            })
          )
        );
      })
    )
  );

  LoadSecurtySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.LOAD_SECURITY_SUCCESS),
        tap((payload: any) => {
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          // return payload.security;
        })
      ),
    { dispatch: false }
  );

  LoadSecurityFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.LOAD_SECURITY_FAILED),
        tap((error: any) => {
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

  LogOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActionTypes.SIGN_OUT),
      tap(() => {
        try {
          this.authSvc.removeSessionItem('id_token');
          // clear me
          // clear projects
          //
          return SecurityActions.LogOutSuccess();
        } catch (error) {
          return SecurityActions.LogOutFailed(error);
        }
      })
    )
  );

  LogOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.SIGN_OUT_SUCCESS),
        tap(() => {
          this.authSvc.removeSessionItem('id_token');
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['security/me']);
        })
      ),
    { dispatch: false }
  );

  LogOutFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SecurityActionTypes.SIGN_OUT_FAILED),
        tap(() => {
          this.authSvc.removeSessionItem('id_token');
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
