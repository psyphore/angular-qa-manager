import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as MeActions from '@states/me/me.actions';
import { Me } from '@models/security.interface';
import { AuthService } from '@services/security.service';
import { SecurityActionTypes } from '@enums/security.enum';

@Injectable()
export class MeEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private authSvc: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  SECURITY_ACTIONS_SUCCESS = [
    SecurityActionTypes.UPDATE_SUCCESS,
    SecurityActionTypes.LOAD_SECURITY_SUCCESS
  ];

  SECURITY_ACTIONS_FAILED = [
    SecurityActionTypes.UPDATE_FAILED,
    SecurityActionTypes.LOAD_SECURITY_FAILED
  ];

  loadSecurity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SecurityActionTypes.LOAD_SECURITY),
      switchMap(() => {
        return this.authSvc.me().pipe(
          map(
            (me: Me) => MeActions.LoadSecuritySuccess(me),
            catchError(error => of(MeActions.LoadSecurityFailed(error.message)))
          )
        );
      })
    )
  );

  loadSecuritySuccess$ = createEffect(
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

  loadSecurityFailed$ = createEffect(
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
