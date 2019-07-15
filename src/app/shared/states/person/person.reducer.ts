import { PersonActionTypes } from './../../enums/person.enum';
import { PersonActions } from './person.actions';

import { PersonState } from './person.state';

export function personInitialState(): PersonState {
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

export function personReducer(
  state: PersonState = personInitialState(),
  action: PersonActions
): PersonState {
  switch (action.type) {
    case PersonActionTypes.LOAD_PERSONS_SUCCESS:
      return {
        ...state,
        entities: arrayToObject(action.payload)
      };

    case PersonActionTypes.ADD_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.person.id]: action.person
        }
      };

    case PersonActionTypes.DELETE_SUCCESS:
      const entities = { ...state.entities };
      delete entities[action.id];
      return {
        ...state,
        entities
      };

    case PersonActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.person.id]: action.person
        }
      };

    default:
      return state;
  }
}
