import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_ME_REQUEST: {
      return {
        ...state,
        profile: null,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_ME_SUCCESS: {
      return {
        ...state,
        profile: action.payload.profile,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_ME_FAILURE: {
      return {
        ...state,
        profile: null,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
