import { Release, Issue } from '@models/project.interface';
import { EnumsReponse } from '@models/enums.interface';

export interface ProjectState {
  releases: { [key: string]: Release };
  release: Release;
  issues: { [key: string]: Issue };
  issue: Issue;
  options: EnumsReponse;
}
