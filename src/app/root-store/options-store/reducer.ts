import { Actions, ActionTypes } from './actions';
import { featureAdapter, initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_OPTIONS_REQUEST: {
      return {
        ...state,
        values: null,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_OPTIONS_SUCCESS: {
      return {
        ...state,
        values: action.payload,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_OPTIONS_FAILURE: {
      return {
        ...state,
        values: null,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
