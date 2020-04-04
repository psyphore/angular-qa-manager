import { SignInStoreState } from './sign-in-store';
import { OptionsStoreState } from './options-store';
import { MeStoreState } from './me-store';

export interface RootState {
  signIn: SignInStoreState.SignInState;
  me: MeStoreState.ProfileState;
  options: OptionsStoreState.OptionsState;
}
