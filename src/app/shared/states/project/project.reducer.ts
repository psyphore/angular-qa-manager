import { ProjectActions } from './project.actions';
import { ProjectActionTypes } from '@enums/project.enum';
import { ProjectState } from './project.state';

export function projectInitialState(): ProjectState {
  return {
    ids: [],
    entities: {}
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
        entities: arrayToObject(action.payload)
      };

    case ProjectActionTypes.ADD_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.project.id]: action.project
        }
      };

    case ProjectActionTypes.DELETE_SUCCESS:
      const entities = { ...state.entities };
      delete entities[action.id];
      return {
        ...state,
        entities
      };

    case ProjectActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.project.id]: action.project
        }
      };

    default:
      return state;
  }
}
