import { SecurityActions } from './security.actions';
import { SecurityActionTypes } from '@enums/security.enum';
import {
  SecurityState,
  securityAdapter,
  MeState,
  meAdapter
} from './security.state';

export function securityInitialState(): SecurityState {
  return securityAdapter.getInitialState();
}

export function meInitialState(): MeState {
  return meAdapter.getInitialState();
}

export function securityReducer(
  state: SecurityState = securityInitialState(),
  action: SecurityActions
): SecurityState | MeState {
  switch (action.type) {
    case SecurityActionTypes.SIGN_OUT_SUCCESS:
      return securityAdapter.removeAll(state);

    case SecurityActionTypes.SIGN_IN_SUCCESS:
      return securityAdapter.addOne(action.security, state);

    default:
      return state;
  }
}

export function meReducer(
  state: MeState = meInitialState(),
  action: SecurityActions
): MeState {
  switch (action.type) {
    case SecurityActionTypes.LOAD_SECURITY_SUCCESS:
      return meAdapter.addOne(action.payload, state);

    case SecurityActionTypes.UPDATE_SUCCESS:
      return meAdapter.updateOne(action.payload.me.id, state);

    default:
      return state;
  }
}
