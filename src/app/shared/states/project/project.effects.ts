import { GeneralServices } from '@services/basic.service';
import {
  ReleasesResponse,
  ReleaseUpdateResponse,
  ReleaseResponse,
  ReleaseUpdate,
  Release
} from '@models/release.interface';
import * as ProjectActions from '@states/project/project.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProjectsService } from '@services/projects.service';
import { ProjectActionTypes } from '@enums/project.enum';

@Injectable()
export class ProjectEffects {
  private snackBarDuration = 2000;
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private utils: GeneralServices,
    public snackBar: MatSnackBar
  ) {}

  PROJECT_ACTIONS_SUCCESS = [
    ProjectActionTypes.ADD_SUCCESS,
    ProjectActionTypes.UPDATE_SUCCESS,
    ProjectActionTypes.DELETE_SUCCESS,
    ProjectActionTypes.LOAD_PROJECTS_SUCCESS
  ];

  PROJECT_ACTIONS_FAILED = [
    ProjectActionTypes.ADD_FAILED,
    ProjectActionTypes.UPDATE_FAILED,
    ProjectActionTypes.DELETE_FAILED,
    ProjectActionTypes.LOAD_PROJECTS_FAILED
  ];

  loadAllProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.LoadReleases),
      switchMap((action: any) =>
        this.projectsService.getAllReleases(action.limit, action.start).pipe(
          map((response: ReleasesResponse) =>
            ProjectActions.LoadReleasesSuccess(response.releases)
          ),
          catchError(error => of(ProjectActions.LoadReleasesFailed(error)))
        )
      )
    )
  );

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.AddRelease),
      switchMap((action: any) =>
        this.projectsService.addRelease(action.payload).pipe(
          map((res: ReleaseUpdateResponse) =>
            ProjectActions.AddReleaseSuccess(res.release)
          ),
          catchError(error => of(ProjectActions.AddReleaseFailed(error)))
        )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.DeleteRelease),
      switchMap((action: any) =>
        this.projectsService.deleteRelease(action.payload).pipe(
          map((res: ReleaseUpdateResponse) =>
            ProjectActions.DeleteReleaseSuccess(res.release)
          ),
          catchError(error => of(ProjectActions.DeleteReleaseFailed(error)))
        )
      )
    )
  );

  getProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.LoadRelease),
      switchMap(({ id }) =>
        this.projectsService.getReleaseById(id).pipe(
          map((res: ReleaseResponse) =>
            ProjectActions.LoadReleaseSuccess(res.release)
          ),
          catchError(error => of(ProjectActions.LoadReleaseFailed(error)))
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActions.UpdateRelease),
      switchMap((action: any) =>
        this.projectsService.updateRelease(action.payload).pipe(
          map((res: ReleaseUpdateResponse) =>
            ProjectActions.UpdateReleaseSuccess(res.release)
          ),
          catchError(error => of(ProjectActions.UpdateReleaseFailed(error)))
        )
      )
    )
  );

  successNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.PROJECT_ACTIONS_SUCCESS),
        tap(() =>
          this.snackBar.open('SUCCESS', 'Operation success', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );

  failedNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(...this.PROJECT_ACTIONS_FAILED),
        tap(() =>
          this.snackBar.open('FAILED', 'Operation failed', {
            duration: this.snackBarDuration
          })
        )
      ),
    { dispatch: false }
  );
}
