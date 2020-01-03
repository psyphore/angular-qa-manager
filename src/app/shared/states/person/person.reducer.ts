import { PersonActionTypes } from '@enums/person.enum';
import { PersonActions } from './person.actions';

import { PersonState, personAdapter } from './person.state';

export function personInitialState(): PersonState {
  return personAdapter.getInitialState();
}

export function personReducer(
  state: PersonState = personInitialState(),
  action: PersonActions
): PersonState {
  switch (action.type) {
    case PersonActionTypes.LOAD_PERSONS_SUCCESS:
      return personAdapter.addAll(action.payload, state);

    case PersonActionTypes.LOAD_PERSON_SUCCESS:
      return personAdapter.updateOne(action.payload.id, state);

    default:
      return state;
  }
}
