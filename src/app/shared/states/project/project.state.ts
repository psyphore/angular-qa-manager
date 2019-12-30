import { ReleaseSummary, Release, Issue } from '@models/project.interface';
export interface ProjectState {
  ids: number[];
  releases: { [key: string]: ReleaseSummary };
  release: Release;
  issues: { [key: string]: Issue };
  issue: Issue;
}
