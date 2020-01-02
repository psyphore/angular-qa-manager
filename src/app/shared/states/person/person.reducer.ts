import { PersonActionTypes } from '@enums/person.enum';
import { PersonActions } from './person.actions';

import { PersonState } from './person.state';

export function personInitialState(): PersonState {
  return {
    entities: {},
    entity: null
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

    case PersonActionTypes.LOAD_PERSON_SUCCESS:
      return {
        ...state,
        entity: {
          ...state.entity,
          [action.payload.id]: action.payload
        }
      };

    default:
      return state;
  }
}
