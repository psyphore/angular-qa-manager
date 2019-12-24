import { personFields } from './person.queries';
import gql from 'graphql-tag';
import { Project } from '@models/project.interface';

export const IssueFields = gql`
  fragment basicIssueFields on Issue {
    id
    summary
    description
    points
    person {
      ...basicPersonFields
    }
  }

  ${personFields}
`;

export const ReleaseFields = gql`
  fragment basicReleaseFields on Release {
    id
    projectName
    releaseName
    system {
      name
    }
    environment {
      name
    }
    status {
      name
    }
    attachments {
      summary
    }
    person {
      ...basicPersonFields
    }
    issues {
      id
      summary
      points
    }
  }
`;

export const GetProjects = gql`
  query getReleases($limit: Int, $start: Int) {
    releases(limit: $limit, start: $start) {
      ...basicReleaseFields
    }
  }

  ${ReleaseFields}
`;

export const GetProjectById = gql`
  query getProjectById($releaseId: ID!) {
    release(id: $releaseId) {
      id
      projectName
      releaseName
      person {
        ...basicPersonFields
      }
      issues {
        ...basicIssueFields
      }
    }
  }

  ${personFields}
  ${IssueFields}
`;

export interface ProjectsResponse {
  projects: [Project];
}

export interface ProjectResponse {
  project: Project;
}