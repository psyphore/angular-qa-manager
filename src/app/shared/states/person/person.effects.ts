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
    PersonActionTypes.ADD_SUCCESS,
    PersonActionTypes.UPDATE_SUCCESS,
    PersonActionTypes.DELETE_SUCCESS,
    PersonActionTypes.LOAD_PERSONS_SUCCESS
  ];

  PERSON_ACTIONS_FAILED = [
    PersonActionTypes.ADD_FAILED,
    PersonActionTypes.UPDATE_FAILED,
    PersonActionTypes.DELETE_FAILED,
    PersonActionTypes.LOAD_PERSONS_FAILED
  ];

  @Effect()
  loadAllPerson$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.LOAD_PERSONS),
    switchMap(() =>
      this.personService.getUsers().pipe(
        map(
          (response: Array<Person>) =>
            new PersonActions.LoadPersonSuccess(response)
        ),
        catchError(error => of(new PersonActions.LoadPersonFailed(error)))
      )
    )
  );

  @Effect()
  addPerson$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.ADD),
    switchMap((action: any) =>
      this.personService.addUser(action.person).pipe(
        map((person: Person) => new PersonActions.AddSuccess(person)),
        catchError(error => of(new PersonActions.AddFailed(error)))
      )
    )
  );

  @Effect()
  deletePerson$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.DELETE),
    switchMap(({ id }) =>
      this.personService.deleteUser(id).pipe(
        map(() => new PersonActions.DeleteSuccess(id)),
        catchError(error => of(new PersonActions.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  updatePerson$: Observable<any> = this.actions$.pipe(
    ofType(PersonActionTypes.UPDATE),
    switchMap(({ person }) =>
      this.personService.updateUser(person).pipe(
        map(() => new PersonActions.UpdateSuccess(person)),
        catchError(error => of(new PersonActions.UpdateFailed(error)))
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
