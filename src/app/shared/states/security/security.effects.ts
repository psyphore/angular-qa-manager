import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as SecurityActions from '@states/security/security.actions';
import { Me, SignIn, SignInCredentials } from '@models/security.interface';
import { StrapiAuthService, AuthService } from '@services/security.service';
import { SecurityActionTypes } from '@enums/security.enum';

@Injectable()
export class SecurityEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private securityService: StrapiAuthService,
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

  @Effect()
  LogIn$: Observable<SignIn | any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN),
    switchMap((creds: SignInCredentials | any) => {
      return this.securityService.signIn({ creds: creds.security }).pipe(
        map((result: SignIn) => new SecurityActions.LogInSuccess(result)),
        catchError(error => of(new SecurityActions.LogInFailed(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  LogInSuccess$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN_SUCCESS),
    tap((security: any) => {
      // this.authSvc.addSessionItem('id_token', security.security.login.jwt);
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  LogInFailed$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_IN_FAILED),
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
  );

  @Effect()
  LoadSecurity$: Observable<Me | any> = this.actions$.pipe(
    ofType(SecurityActionTypes.LOAD_SECURITY),
    switchMap(() => {
      return this.securityService.me().pipe(
        map((me: Me) => new SecurityActions.LoadSecuritySuccess(me)),
        catchError(error => of(new SecurityActions.LoadSecurityFailed(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  LoadSecurtySuccess$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.LOAD_SECURITY_SUCCESS),
    tap((payload: any) => {
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      return payload.security;
    })
  );

  @Effect({ dispatch: false })
  LoadSecurityFailed$: Observable<any> = this.actions$.pipe(
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
  );

  @Effect()
  LogOut$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT),
    tap(() => {
      try {
        this.authSvc.removeSessionItem('id_token');
        const x = new SecurityActions.LogOutSuccess();
      } catch (error) {
        return new SecurityActions.LogOutFailed(error);
      }
    })
  );

  @Effect({ dispatch: false })
  LogOutSuccess$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT_SUCCESS),
    tap(() => {
      this.authSvc.removeSessionItem('id_token');
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['security/me']);
    })
  );

  @Effect({ dispatch: false })
  LogOutFailed$: Observable<any> = this.actions$.pipe(
    ofType(SecurityActionTypes.SIGN_OUT_FAILED),
    tap(() => {
      this.authSvc.removeSessionItem('id_token');
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: this.snackBarDuration
      });
      this.router.navigate(['/']);
    })
  );
}
