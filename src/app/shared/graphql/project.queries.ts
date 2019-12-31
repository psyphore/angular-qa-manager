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
      ...basicIssueFields
    }
  }
  ${personFields}
  ${IssueFields}
`;

export const GetReleases = gql`
  query getReleases($limit: Int, $start: Int) {
    releases(limit: $limit, start: $start) {
      ...basicReleaseFields
    }
  }

  ${ReleaseFields}
`;

export const GetReleaseById = gql`
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
