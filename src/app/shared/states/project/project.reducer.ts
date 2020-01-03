import { ProjectActions } from './project.actions';
import { ProjectActionTypes } from '@enums/project.enum';
import {
  ReleaseState,
  EnumsState,
  releaseAdapter,
  enumsAdapter
} from './project.state';

export function releaseInitialState(): ReleaseState {
  return releaseAdapter.getInitialState();
}

export function enumsInitialState(): EnumsState {
  return enumsAdapter.getInitialState();
}

export function projectReducer(
  state: ReleaseState = releaseInitialState(),
  action: ProjectActions
): ReleaseState {
  switch (action.type) {
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      return releaseAdapter.addAll(action.payload, state);

    case ProjectActionTypes.ADD_SUCCESS:
      const addsuccess = { ...state.entities };
      addsuccess[0].id = action.project.id;
      return releaseAdapter.addOne(addsuccess[0], state);

    case ProjectActionTypes.DELETE_SUCCESS:
      return releaseAdapter.removeOne(action.release.id, state);

    case ProjectActionTypes.UPDATE_SUCCESS:
      const updatesuccess = { ...state.entities }[action.project.id];
      return releaseAdapter.updateOne(updatesuccess.id as any, state);

    default:
      return state;
  }
}

export function enumsReducer(
  state: EnumsState = enumsInitialState(),
  action: ProjectActions
): EnumsState {
  switch (action.type) {
    case ProjectActionTypes.LOAD_OPTIONS_SUCCESS:
      return enumsAdapter.addOne(action.payload, state);

    default:
      return state;
  }
}
