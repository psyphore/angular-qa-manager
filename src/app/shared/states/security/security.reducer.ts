import { SecurityActions } from './security.actions';
import { SecurityActionTypes } from '@enums/security.enum';
import { SecurityState } from './security.state';

export function securityInitialState(): SecurityState {
  return {
    ids: [],
    entities: { me: null },
    auth: { login: null }
  };
}

function arrayToObject(array: any[]) {
  return array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}

export function securityReducer(
  state: SecurityState = securityInitialState(),
  action: SecurityActions
): SecurityState {
  switch (action.type) {
    case SecurityActionTypes.LOAD_SECURITY_SUCCESS:
      return {
        ...state,
        entities: action.payload
      };

    case SecurityActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        auth: action.security
      };

    case SecurityActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.security.me.id]: action.security
        }
      };

    case SecurityActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        auth: null
      };

    default:
      return state;
  }
}
