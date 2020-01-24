import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function featureReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_REQUEST: {
      console.log('> SignIn attempt', action);
      return {
        ...state,
        token: null,
        isLoading: true,
        error: null
      };
    }
    case ActionTypes.LOAD_SUCCESS: {
      console.log('> SignIn success', action);
      return {
        ...state,
        token: action.payload.login.jwt,
        isLoading: false,
        error: null
      };
    }
    case ActionTypes.LOAD_FAILURE: {
      console.log('> SignIn failed', action);
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    }
    default: {
      return state;
    }
  }
}
