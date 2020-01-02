import { ProjectActions } from './project.actions';
import { ProjectActionTypes } from '@enums/project.enum';
import { ProjectState } from './project.state';
import { EnumsReponse } from '@models/enums.interface';

export function projectInitialState(): ProjectState {
  return {
    releases: {},
    release: null,
    issues: {},
    issue: null,
    options: {} as EnumsReponse
  };
}

function arrayToObject(array) {
  return array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}

export function projectReducer(
  state: ProjectState = projectInitialState(),
  action: ProjectActions
): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        releases: arrayToObject(action.payload)
      };

    case ProjectActionTypes.ADD_SUCCESS:
      const _releases = { ...state.releases };
      _releases[action.project.id].id = action.project.id;

      return {
        ...state,
        releases: {
          ...state.releases,
          ..._releases
        }
      };

    case ProjectActionTypes.DELETE_SUCCESS:
      const releases = { ...state.releases };
      delete releases[action.release.id];
      return {
        ...state,
        releases
      };

    case ProjectActionTypes.UPDATE_SUCCESS:
      const releases_ = { ...state.releases };
      releases_[action.project.id].id = action.project.id;

      return {
        ...state,
        releases: {
          ...state.releases,
          ...releases_
        }
      };

    case ProjectActionTypes.LOAD_OPTIONS_SUCCESS:
      return {
        ...state,
        options: {
          ...state.options,
          ...action.payload
        }
      };

    default:
      return state;
  }
}
