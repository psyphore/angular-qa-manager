export class Project {
  constructor(
    public id: number,
    public name: string,
    public releaseName: string,
    public customerName: string,
    public leadName: string,
    public totalStoryPoints: number,
    public totalStoryCount: number,
    public storyItems: Array<Story>
  ) {}
}

export class Story {
  constructor(
    public id: number,
    public JIRA: string,
    public developer: string,
    public status: string,
    public dateCompleted: string,
    public points: number
  ) {}
}

export enum System {
  iPlatformSMA,
  iPlatformConfigurable,
  connect,
  digital,
  flexi,
  cims360,
  qRater,
  configuration,
  other
}

export enum Environment {
  production,
  uat,
  preProduction,
  demo,
  staging
}
