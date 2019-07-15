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
