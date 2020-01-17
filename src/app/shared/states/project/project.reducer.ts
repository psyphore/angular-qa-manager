import { on, createReducer, Action } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import {
  ReleaseState,
  releaseAdapter,
  releaseInitialState
} from './project.state';
import { Update } from '@ngrx/entity';
import { Release } from '@models/release.interface';

const reducer = createReducer(
  releaseInitialState(),
  on(ProjectActions.AddReleaseSuccess, (state, { payload }) =>
    releaseAdapter.addOne(<Release>{id: payload.id}, state)
  ),
  on(ProjectActions.DeleteReleaseSuccess, (state, { payload }) =>
    releaseAdapter.removeOne(payload.id, state)
  ),
  on(ProjectActions.UpdateReleaseSuccess, (state, { payload }) =>
    releaseAdapter.updateOne(<Update<Release>>{id: payload.id}, state)
  )
);

export function projectReducer(
  state: ReleaseState = releaseInitialState(),
  action: Action
): ReleaseState {
  return reducer(state, action);
}
