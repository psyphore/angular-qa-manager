import * as PersonActions from '@states/person/person.actions';
import { PersonService } from '@services/person.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { PersonActionTypes } from '@shared/enums/person.enum';
import { Person } from '@models/person.interface';

@Injectable()
export class PersonEffects {
  constructor(
    private actions$: Actions,
    private personService: PersonService,
    public snackBar: MatSnackBar
  ) {}

  PERSON_ACTIONS_SUCCESS = [
    PersonActionTypes.LOAD_PERSONS_SUCCESS,
    PersonActionTypes.LOAD_PERSON_SUCCESS
  ];

  PERSON_ACTIONS_FAILED = [
    PersonActionTypes.LOAD_PERSONS_FAILED,
    PersonActionTypes.LOAD_PERSON_FAILED
  ];

  @Effect()
  loadAll$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.LOAD_PERSONS),
    switchMap(() =>
      this.personService.getUsers().pipe(
        map(
          (response: Array<Person>) =>
            new PersonActions.LoadPeopleSuccess(response)
        ),
        catchError(error => of(new PersonActions.LoadPeopleFailed(error)))
      )
    )
  );

  @Effect()
  loadPerson$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.LOAD_PERSON),
    switchMap((userId: number) =>
      this.personService.getUser(userId).pipe(
        map(
          (response: Person) => new PersonActions.LoadPersonSuccess(response)
        ),
        catchError(error => of(new PersonActions.LoadPersonFailed(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  successNotification$ = this.actions$.pipe(
    ofType(...this.PERSON_ACTIONS_SUCCESS),
    tap(() =>
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: 2000
      })
    )
  );
  @Effect({ dispatch: false })
  failedNotification$ = this.actions$.pipe(
    ofType(...this.PERSON_ACTIONS_FAILED),
    tap(() =>
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: 2000
      })
    )
  );
}
