import { SignInStoreState } from './sign-in-store';
import { OptionsStoreState } from './options-store';
import { MeStoreState } from './me-store';
import { PeopleStoreState } from './people-store';
import { IssueStoreState } from './issue-store';
import { ReleaseStoreState } from './release-store';

export interface RootState {
  signIn: SignInStoreState.SignInState;
  me: MeStoreState.ProfileState;
  options: OptionsStoreState.OptionsState;
  people: PeopleStoreState.PeopleState;
  issue: IssueStoreState.IssueState;
  release: ReleaseStoreState.ReleaseState;
}
