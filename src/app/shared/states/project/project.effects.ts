import * as ProjectActions from '@states/project/project.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Project } from '@models/project.interface';
import { ProjectsService } from '@services/projects.service';
import { ProjectActionTypes } from '@shared/enums/project.enum';

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
  loadAllProject$: Observable<any> = this.actions$.pipe(
    ofType(ProjectActionTypes.LOAD_PROJECTS),
    switchMap(() =>
      this.projectsService.getProjects().pipe(
        map(
          (response: Array<Project | any>) =>
            new ProjectActions.LoadProjectSuccess(response)
        ),
        catchError(error => of(new ProjectActions.LoadProjectFailed(error)))
      )
    )
  );

  @Effect()
  addProject$: Observable<any> = this.actions$.pipe(
    ofType(ProjectActionTypes.ADD),
    switchMap((action: any) =>
      this.projectsService.add(action.project).pipe(
        map((project: Project) => new ProjectActions.AddSuccess(project)),
        catchError(error => of(new ProjectActions.AddFailed(error)))
      )
    )
  );

  @Effect()
  deleteProject$: Observable<any> = this.actions$.pipe(
    ofType(ProjectActionTypes.DELETE),
    switchMap(({ id }) =>
      this.projectsService.delete(id).pipe(
        map(() => new ProjectActions.DeleteSuccess(id)),
        catchError(error => of(new ProjectActions.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  getProject$: Observable<any> = this.actions$.pipe(
    ofType(ProjectActionTypes.DELETE),
    switchMap(({ id }) =>
      this.projectsService.getProject(id).pipe(
        map((project: Project) => new ProjectActions.LoadProject()),
        catchError(error => of(new ProjectActions.LoadProjectFailed(error)))
      )
    )
  );

  @Effect()
  updateProject$: Observable<any> = this.actions$.pipe(
    ofType(ProjectActionTypes.UPDATE),
    switchMap(({ project }) =>
      this.projectsService.update(project).pipe(
        map(() => new ProjectActions.UpdateSuccess(project)),
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
