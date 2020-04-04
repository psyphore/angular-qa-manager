import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '@shared/services/security.service';

import { LoadProfile, ProfileFailure, ProfileSuccess } from './actions';

import { Me } from '@shared/interfaces/security.interface';

export interface ProfileStateModel {
  profile: Me;
  isLoading?: boolean;
  error?: any;
}

export const initialStateModel: ProfileStateModel = {
  profile: null,
  isLoading: false,
  error: null
};

@State<ProfileStateModel>({
  name: 'profile',
  defaults: initialStateModel
})
export class ProfileState {
  private snackBarDuration = 2000;
  constructor(
    private dataService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  @Selector()
  static getProfile(state: ProfileStateModel) {
    return state.profile;
  }

  @Selector()
  static isLoading(state: ProfileStateModel) {
    return state.isLoading;
  }

  @Selector()
  static getErrors(state: ProfileStateModel) {
    return state.error;
  }

  @Action(LoadProfile, { cancelUncompleted: true })
  loadProfile({ patchState, dispatch }: StateContext<ProfileStateModel>) {
    patchState({ isLoading: true });
    this.dataService.me().pipe(
      tap(response =>
        response.me
          ? dispatch(new ProfileSuccess(response))
          : dispatch(new ProfileFailure('eish...'))
      ),
      catchError(error => of(new ProfileFailure(error.message)))
    );
  }

  @Action(ProfileSuccess)
  profileSuccess({ patchState }: StateContext<ProfileStateModel>) {
    patchState({ isLoading: false });
    this.snackBar.open('FAILED', 'Profile operation is a success', {
      duration: this.snackBarDuration
    });
    this.router.navigate(['security/me']);
  }

  @Action([ProfileFailure])
  profileFailure({ patchState }: StateContext<ProfileStateModel>) {
    patchState({ isLoading: false });
    this.snackBar.open('SUCCESS', 'Profile operation failed', {
      duration: this.snackBarDuration
    });
    this.router.navigate(['security/signin']);
  }
}
