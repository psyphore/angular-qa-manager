import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Person } from '@shared/interfaces/person.interface';

import { LoadPeople, LoadPeopleFailure, LoadPeopleSuccess } from './actions';
import { PersonService } from '@shared/services';

export interface PeopleStateModel {
  values: Person[];
  isLoading?: boolean;
  error?: any;
}

export const initialState: PeopleStateModel = {
  values: null,
  isLoading: false,
  error: null
};

@State<PeopleStateModel>({
  name: 'people',
  defaults: initialState
})
export class PeopleState {
  private snackBarDuration = 2000;
  constructor(
    private dataService: PersonService,
    private snackBar: MatSnackBar
  ) { }

  @Selector()
  static getPeople(state: PeopleStateModel) {
    return state.values;
  }

  @Selector()
  static isLoading(state: PeopleStateModel) {
    return state.isLoading;
  }

  @Selector()
  static getErrors(state: PeopleStateModel) {
    return state.error;
  }

  @Action(LoadPeople, { cancelUncompleted: true })
  loadPeople({ patchState, dispatch }: StateContext<PeopleStateModel>) {
    patchState({ isLoading: true });
    return this.dataService.getUsers().pipe(
      tap(response =>
        response
          ? dispatch(new LoadPeopleSuccess(response))
          : dispatch(new LoadPeopleFailure('eish...'))
      ),
      catchError(error => of(dispatch(new LoadPeopleFailure(error.message))))
    );
  }

  @Action(LoadPeopleSuccess)
  optionsLoaded(
    { setState }: StateContext<PeopleStateModel>,
    { payload }: LoadPeopleSuccess
  ) {
    setState({ values: payload, isLoading: false, error: null });
    this.snackBar.open('SUCCESS', 'People operation is a success', {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }

  @Action(LoadPeopleFailure)
  optionsFailed(
    { patchState }: StateContext<PeopleStateModel>,
    { message }: LoadPeopleFailure
  ) {
    patchState({ values: null, isLoading: false, error: message });
    this.snackBar.open('FAILED', `People operation failed`, {
      duration: this.snackBarDuration
    });
  }
}
