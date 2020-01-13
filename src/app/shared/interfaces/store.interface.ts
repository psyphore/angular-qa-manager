import { EnumsState } from './../states/project/project.state';
import { ReleaseState, IssueState } from '@states/project';
import { PersonState } from '@states/person';
import { SecurityState } from '@states/security';
import { MeState } from '@states/me';

export interface AppStore {
  readonly release: ReleaseState;
  readonly issue: IssueState;
  readonly person: PersonState;
  readonly security: SecurityState;
  readonly me: MeState;
  readonly enums: EnumsState;
}
