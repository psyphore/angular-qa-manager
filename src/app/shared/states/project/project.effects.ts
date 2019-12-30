import {
  ReleasesResponse,
  ReleaseUpdateResponse,
  ReleaseResponse,
  ReleaseUpdate
} from '@models/project.interface';
import * as ProjectActions from '@states/project/project.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Project, ReleaseSummary, Release } from '@models/project.interface';
import { ProjectsService } from '@services/projects.service';
import { ProjectActionTypes } from '@enums/project.enum';

@Injectable()
export class ProjectEffects {
  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
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

  @Effect()
  loadAllProject$: Observable<ReleaseSummary | any> = this.actions$.pipe(
    ofType(ProjectActionTypes.LOAD_PROJECTS),
    switchMap(() =>
      this.projectsService.getAllReleases(999, 0).pipe(
        map(
          (response: ReleasesResponse) =>
            new ProjectActions.LoadProjectSuccess(response.releases)
        ),
        catchError(error => of(new ProjectActions.LoadProjectFailed(error)))
      )
    )
  );

  @Effect()
  addProject$: Observable<ReleaseUpdate | any> = this.actions$.pipe(
    ofType(ProjectActionTypes.ADD),
    switchMap((action: Release) =>
      this.projectsService.addRelase(action).pipe(
        map(
          (res: ReleaseUpdateResponse) =>
            new ProjectActions.AddSuccess(res.release)
        ),
        catchError(error => of(new ProjectActions.AddFailed(error)))
      )
    )
  );

  @Effect()
  deleteProject$: Observable<ReleaseUpdate | any> = this.actions$.pipe(
    ofType(ProjectActionTypes.DELETE),
    switchMap((release: Release) =>
      this.projectsService.deleteRelase(release).pipe(
        map(
          (res: ReleaseUpdateResponse) =>
            new ProjectActions.DeleteSuccess(res.release)
        ),
        catchError(error => of(new ProjectActions.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  getProject$: Observable<Release | any> = this.actions$.pipe(
    ofType(ProjectActionTypes.DELETE),
    switchMap(({ id }) =>
      this.projectsService.getReleaseById(id).pipe(
        map((res: ReleaseResponse) => new ProjectActions.LoadProject()),
        catchError(error => of(new ProjectActions.LoadProjectFailed(error)))
      )
    )
  );

  @Effect()
  updateProject$: Observable<ReleaseUpdate | any> = this.actions$.pipe(
    ofType(ProjectActionTypes.UPDATE),
    switchMap((release: Release) =>
      this.projectsService.updateRelase(release).pipe(
        map(
          (res: ReleaseUpdateResponse) =>
            new ProjectActions.UpdateSuccess(res.release)
        ),
        catchError(error => of(new ProjectActions.UpdateFailed(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  successNotification$ = this.actions$.pipe(
    ofType(...this.PROJECT_ACTIONS_SUCCESS),
    tap(() =>
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: 2000
      })
    )
  );
  @Effect({ dispatch: false })
  failedNotification$ = this.actions$.pipe(
    ofType(...this.PROJECT_ACTIONS_FAILED),
    tap(() =>
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: 2000
      })
    )
  );
}
