import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { EnumsResponse } from '../../shared/interfaces/enums.interface';

import { LoadOptions, LoadOptionsFailure, LoadOptionsSuccess } from './actions';
import { GeneralServices } from '@shared/services';

export interface OptionsStateModel {
  values: EnumsResponse;
  isLoading?: boolean;
  error?: any;
}

export const initialState: OptionsStateModel = {
  values: null,
  isLoading: false,
  error: null
};

@State<OptionsStateModel>({
  name: 'options',
  defaults: initialState
})
export class OptionsState {
  private snackBarDuration = 2000;
  constructor(
    private dataService: GeneralServices,
    private snackBar: MatSnackBar
  ) {}

  @Selector()
  static getOptions(state: OptionsStateModel) {
    return state.values;
  }

  @Selector()
  static isLoading(state: OptionsStateModel) {
    return state.isLoading;
  }

  @Selector()
  static getErrors(state: OptionsStateModel) {
    return state.error;
  }

  @Action(LoadOptions, { cancelUncompleted: true })
  loadOptions({ patchState, dispatch }: StateContext<OptionsStateModel>) {
    patchState({ isLoading: true });

    this.dataService.getAllOptions().pipe(
      tap(response =>
        response
          ? dispatch(new LoadOptionsSuccess(response))
          : dispatch(new LoadOptionsFailure('eish...'))
      ),
      catchError(error => of(new LoadOptionsFailure(error.message)))
    );
  }

  @Action(LoadOptionsSuccess)
  signedIn(
    { patchState }: StateContext<OptionsStateModel>,
    { payload }: LoadOptionsSuccess
  ) {
    patchState({ values: payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'Options operation is a success', {
      duration: this.snackBarDuration
    });
  }

  @Action(LoadOptionsFailure)
  signInFailed(
    { patchState }: StateContext<OptionsStateModel>,
    { message }: LoadOptionsFailure
  ) {
    patchState({ values: null, isLoading: false, error: message });
    this.snackBar.open('FAILED', `Options operation failed`, {
      duration: this.snackBarDuration
    });
  }
}
