import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../../shared/services';

import {
  SigningIn,
  SignInSuccess,
  SignInFailure,
  SigningOut,
  SignOutSuccess,
  SignOutFailure
} from './actions';

export interface SignInStateModel {
  token: string;
  isLoading?: boolean;
  error?: any;
}

const initialStateModel: SignInStateModel = {
  token: null,
  isLoading: false,
  error: null
};

@State<SignInStateModel>({
  name: 'signIn',
  defaults: initialStateModel
})
export class SignInState {
  private snackBarDuration = 2000;
  constructor(
    private dataService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @Selector()
  static getToken(state: SignInStateModel) {
    return state.token;
  }

  @Selector()
  static getErrors(state: SignInStateModel) {
    return state.error;
  }

  @Selector()
  static isLoading(state: SignInStateModel) {
    return state.isLoading;
  }

  @Action(SigningIn, { cancelUncompleted: true })
  signIn(
    { patchState, dispatch }: StateContext<SignInStateModel>,
    { payload }: SigningIn
  ) {
    patchState({ isLoading: true });

    this.dataService.signIn(payload).pipe(
      tap(response =>
        response.login
          ? dispatch(new SignInSuccess(response))
          : dispatch(new SignInFailure('failed to sign in....'))
      ),
      catchError(error => of(new SignInFailure(error.message)))
    );
  }

  @Action(SignInSuccess)
  signedIn(
    { patchState }: StateContext<SignInStateModel>,
    { payload }: SignInSuccess
  ) {
    patchState({ token: payload.login.jwt, isLoading: false });
    this.snackBar.open('SUCCESS', 'SignIn operation is a success', {
      duration: this.snackBarDuration
    });
    this.router.navigate(['security/me']);
  }

  @Action(SignInFailure)
  signInFailed(
    { patchState }: StateContext<SignInStateModel>,
    { message }: SignInFailure
  ) {
    patchState({ token: null, isLoading: false, error: message });
    this.snackBar.open('FAILED', `SignIn operation failed`, {
      duration: this.snackBarDuration
    });
    this.router.navigate(['security/signin']);
  }

  @Action(SigningOut)
  signOut({ patchState }: StateContext<SignInStateModel>) {
    patchState({ isLoading: true });
  }

  @Action([SignOutFailure, SignOutSuccess])
  signOutFailure({ setState }: StateContext<SignInStateModel>) {
    setState({ ...initialStateModel });
    this.snackBar.open('SUCCESS', 'SignOut operation is a success', {
      duration: this.snackBarDuration
    });
    this.router.navigate(['security/signin']);
  }
}
