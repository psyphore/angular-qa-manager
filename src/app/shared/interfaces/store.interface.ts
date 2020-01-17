import { EnumsState } from '@states/enums';
import { ReleaseState } from '@states/project';
import { IssueState } from '@states/issue';
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
