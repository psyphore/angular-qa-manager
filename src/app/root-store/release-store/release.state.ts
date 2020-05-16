import { State, Action, StateContext, Selector } from '@ngxs/store';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectsService } from '@shared/services/projects.service';

import {
  ReleaseItem,
  ReleaseItemSuccess,
  ReleaseItemFailure,
  ReleaseItemAdd,
  ReleaseItemAddSuccess,
  ReleaseItemAddFailure,
  ReleaseUpdateItem,
  ReleaseUpdateItemSuccess,
  ReleaseUpdateItemFailure,
  ReleaseDeleteItem,
  ReleaseDeleteItemSuccess,
  ReleaseDeleteItemFailure,
  ReleaseItems,
  ReleaseItemsSuccess,
  ReleaseItemsFailure,
} from './release.actions';

import { Release } from '@shared/interfaces/release.interface';

export interface ReleaseStateModel {
  project: Release;
  projects: Release[];
  isLoading?: boolean;
  error?: any;
}

const initialStateModel: ReleaseStateModel = {
  project: null,
  projects: null,
  isLoading: false,
  error: null
};

@State<ReleaseStateModel>({
  name: 'release',
  defaults: initialStateModel
})
export class ReleaseState {
  private snackBarDuration = 2000;
  constructor(
    private projectService: ProjectsService,
    private snackBar: MatSnackBar
  ) { }

  @Selector()
  static getProject(state: ReleaseStateModel) {
    return state.project;
  }

  @Selector()
  static getProjects(state: ReleaseStateModel) {
    return state.projects;
  }

  @Selector()
  static getErrors(state: ReleaseStateModel) {
    return state.error;
  }

  @Selector()
  static isLoading(state: ReleaseStateModel) {
    return state.isLoading;
  }

  @Action(ReleaseItems, { cancelUncompleted: true })
  fetchReleases(
    { patchState, dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItems
  ) {
    patchState({ isLoading: true });
    this.projectService.getAllReleases(payload.limit, payload.start).pipe(
      tap(response => dispatch(new ReleaseItemsSuccess(response.releases))),
      catchError(error => of(new ReleaseItemsFailure(error.message)))
    );
  }

  @Action(ReleaseItem, { cancelUncompleted: true })
  fetchRelease(
    { patchState, dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItem
  ) {
    patchState({ isLoading: true });
    this.projectService.getReleaseById(payload).pipe(
      tap(response =>
        response.release
          ? dispatch(new ReleaseItemSuccess(response.release))
          : dispatch(new ReleaseItemFailure('failed'))
      ),
      catchError(error => of(new ReleaseItemFailure(error.message)))
    );
  }

  @Action(ReleaseItemAdd, { cancelUncompleted: true })
  addRelease(
    { patchState, dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItemAdd
  ) {
    patchState({ isLoading: true });
    this.projectService.addRelease(payload).pipe(
      tap(response => dispatch(new ReleaseItemAddSuccess(response.release))
      ),
      catchError(error => of(new ReleaseItemAddFailure(error.message)))
    );
  }

  @Action(ReleaseUpdateItem, { cancelUncompleted: true })
  updateRelease(
    { patchState, dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseUpdateItem
  ) {
    patchState({ isLoading: true });
    this.projectService.updateRelease(payload).pipe(
      tap(response => dispatch(new ReleaseUpdateItemSuccess(response.release))),
      catchError(error => of(new ReleaseItemFailure(error.message)))
    );
  }

  @Action(ReleaseDeleteItem, { cancelUncompleted: true })
  deleteRelease(
    { patchState, dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseDeleteItem
  ) {
    patchState({ isLoading: true });
    this.projectService.deleteRelease(payload).pipe(
      tap(response =>
        response.release
          ? dispatch(new ReleaseDeleteItemSuccess(response.release))
          : dispatch(new ReleaseDeleteItemFailure('failed'))
      ),
      catchError(error => of(new ReleaseItemFailure(error.message)))
    );
  }

  @Action([ReleaseItemSuccess])
  fetchReleaseSuccess(
    { patchState }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItemSuccess
  ) {
    patchState({ project: <Release>payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'Release operation is a success', {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }

  @Action([ReleaseItemsSuccess])
  fetchReleasesSuccess(
    { patchState }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItemsSuccess
  ) {
    patchState({ projects: payload, isLoading: false });
    this.snackBar.open('SUCCESS', 'Release operation is a success', {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }

  @Action([ReleaseItemAddSuccess, ReleaseUpdateItemSuccess, ReleaseDeleteItemSuccess])
  releaseSuccess(
    { dispatch }: StateContext<ReleaseStateModel>,
    { payload }: ReleaseItemAddSuccess | ReleaseUpdateItemSuccess | ReleaseDeleteItemSuccess
  ) {
    return dispatch(new ReleaseItems());
  }

  @Action([ReleaseItemFailure, ReleaseItemAddFailure, ReleaseUpdateItemFailure, ReleaseDeleteItemFailure, ReleaseItemsFailure])
  releaseFailed(
    { patchState }: StateContext<ReleaseStateModel>,
    { message }: ReleaseItemFailure | ReleaseItemAddFailure | ReleaseUpdateItemFailure | ReleaseDeleteItemFailure | ReleaseItemsFailure
  ) {
    patchState({ isLoading: false, error: message });
    this.snackBar.open('FAILED', `Release operation failed`, {
      duration: this.snackBarDuration,
      politeness: 'polite'
    });
  }
}
