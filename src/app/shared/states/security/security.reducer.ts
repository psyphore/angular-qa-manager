import { SignInActions } from './security.actions';
import { SecurityState, securityAdapter } from './security.state';
import { SecurityActionTypes } from '@shared/enums/security.enum';

export function securityInitialState(): SecurityState {
  return securityAdapter.getInitialState();
}

export function SecurityRed(
  state: SecurityState = securityInitialState(),
  action: SignInActions
): SecurityState {
  switch (action.type) {
    case SecurityActionTypes.SIGN_IN_SUCCESS:
      return securityAdapter.upsertOne(action.payload, state);

    case SecurityActionTypes.SIGN_IN_FAILED:
    case SecurityActionTypes.SIGN_OUT_FAILED:
    case SecurityActionTypes.SIGN_OUT_SUCCESS:
      return securityAdapter.removeAll(state);

    default:
      return state;
  }
}
