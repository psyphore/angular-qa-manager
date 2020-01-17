import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as SecurityActions from '@states/security/security.actions';
import { AuthService } from '@services/security.service';
import { AppStore } from '@models/store.interface';
import { Store } from '@ngrx/store';

@Injectable()
export class SecurityEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private store$: Store<AppStore>,
    private authSvc: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}
  logIn$ = createEffect(
    () =>
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
}
