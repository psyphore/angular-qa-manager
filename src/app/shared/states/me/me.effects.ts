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

  loadSecurity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MeActions.LoadMe),
      switchMap(() => {
        return this.authSvc.me().pipe(
          map(
            (me: Me) => MeActions.LoadMeSuccess(me),
            catchError(error => of(MeActions.LoadMeFailed(error.message)))
          )
        );
      })
    )
  );

  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MeActions.LoadMeSuccess),
        tap((payload: any) => {
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          });
        })
      ),
    { dispatch: false }
  );

  failed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MeActions.LoadMeFailed),
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

}
