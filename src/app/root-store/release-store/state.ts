import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { ProjectsService } from '../../shared/services/projects.service';
import { IssuesService } from '../../shared/services/issues.service';

import {
  ReleaseItem,
  ReleaseItemSuccess,
  ReleaseItemFailure,
  ReleaseItems,
  ReleaseItemsSuccess,
  ReleaseItemsFailure,
  IssueItem,
  IssueItemSuccess,
  IssueItemFailure
} from './actions';

import { Release } from '@shared/interfaces/release.interface';
import { Issue } from '@shared/interfaces/issue.interface';

export interface ProjectStateModel {
  project: Release;
  projects: Release[];
  issue: Issue;
  issues: Issue[];
  isLoading?: boolean;
  error?: any;
}

const initialStateModel: ProjectStateModel = {
  project: null,
  projects: null,
  issue: null,
  issues: null,
  isLoading: false,
  error: null
};

@State<ProjectStateModel>({
  name: 'project',
  defaults: initialStateModel
})
export class ProjectState {
  private snackBarDuration = 2000;
  constructor(
    private projectService: ProjectsService,
    // private issueServicec: IssuesService,
    // private router: Router,
    private snackBar: MatSnackBar
  ) {}

  @Selector()
  static getProject(state: ProjectStateModel) {
    return state.project;
  }

  @Selector()
  static getProjects(state: ProjectStateModel) {
    return state.projects;
  }

  @Selector()
  static getErrors(state: ProjectStateModel) {
    return state.error;
  }

  @Selector()
  static isLoading(state: ProjectStateModel) {
    return state.isLoading;
  }

  @Action(ReleaseItem, { cancelUncompleted: true })
  fetchRelease(
    { patchState, dispatch }: StateContext<ProjectStateModel>,
    { payload }: ReleaseItem
  ) {
    patchState({ isLoading: true });
    this.projectService.getReleaseById(payload).pipe(
      tap(response =>
        response.release
          ? dispatch(new ReleaseItemSuccess(response.release))
          : dispatch(new ReleaseItemFailure('failed to sign in....'))
      ),
      catchError(error => of(new ReleaseItemFailure(error.message)))
    );
  }

  @Action(ReleaseItemSuccess)
  fetchReleaseSuccess(
    { patchState }: StateContext<ProjectStateModel>,
    { payload }: ReleaseItemSuccess
  ) {
    patchState({ project: payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'SignIn operation is a success', {
      duration: this.snackBarDuration
    });
  }

  @Action(ReleaseItemFailure)
  fetchReleaseFailed(
    { patchState }: StateContext<ProjectStateModel>,
    { message }: ReleaseItemFailure
  ) {
    patchState({ project: null, isLoading: false, error: message });
    this.snackBar.open('FAILED', `SignIn operation failed`, {
      duration: this.snackBarDuration
    });
  }
}
