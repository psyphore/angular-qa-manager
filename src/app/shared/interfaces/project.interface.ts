export interface Project {
  id: number;
  name: string;
  releaseName: string;
  customerName: string;
  leadName: string;
  totalStoryPoints: number;
  totalStoryCount: number;
  environment: string;
  system: string;
  storyItems: Array<Story>;
}

export interface Story {
  id: number;
  JIRA: string;
  developer: string;
  status: string;
  dateCompleted: string;
  points: number;
}

export const systemNames = [
  { id: 1, name: 'iPlatform' },
  { id: 2, name: 'Flexi' },
  { id: 3, name: 'iAdmin' },
  { id: 4, name: 'CIMS360' },
  { id: 5, name: 'iPlatform Configurable' },
  { id: 6, name: 'iGuide' },
  { id: 7, name: 'Digital' },
  { id: 8, name: 'Connect' },
  { id: 9, name: 'QRater' },
  { id: 10, name: 'Configuration' },
  { id: 99, name: 'Other' }
];

export const environmentNames = [
  { id: 1, name: 'Production' },
  { id: 2, name: 'UAT' },
  { id: 3, name: 'Pre Production' },
  { id: 4, name: 'Demo' },
  { id: 5, name: 'Staging' }
];

export interface Issue {
  id: number;
  summary: string;
  description: string;
  link: string;
  person: string;
  status: string;
  points: number;
}

export interface ReleaseSummary {
  id: string;
  projectName: string;
  releaseName: string;
}

export interface Release {
  id: string;
  projectName: string;
  releaseName: string;
  customer: string;
  issues: Issue[];
}

export interface ReleaseUpdate {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface IssueUpdate {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ReleaseResponse {
  release: Release;
}

export interface ReleasesResponse {
  releases: ReleaseSummary[];
}

export interface ReleaseUpdateResponse {
  release: ReleaseUpdate;
}

export interface IssueUpdateResponse {
  issue: IssueUpdate;
}
