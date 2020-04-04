import { PERSON_FIELDS } from './person.queries';
import { ISSUE_FIELDS } from './issue.queries';
import gql from 'graphql-tag';

export const RELEASE_FIELDS = gql`
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
  ${PERSON_FIELDS}
  ${ISSUE_FIELDS}
`;

export const GET_RELEASE_QUERY = gql`
  query getReleases($limit: Int, $start: Int) {
    releases(limit: $limit, start: $start) {
      ...basicReleaseFields
    }
  }

  ${RELEASE_FIELDS}
`;

export const GET_RELEASE_BY_ID_QUERY = gql`
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

  ${PERSON_FIELDS}
  ${ISSUE_FIELDS}
`;

export const GET_PROJECTS_PAGE_QUERY = gql`
  query projectListing($limit: Int = 10, $start: Int = 0) {
    releases(limit: $limit, start: $start) {
      ...basicReleaseFields
    }
    people {
      ...basicPersonFields
      avatar {
        url
      }
    }
    statuses {
      id
      name
    }
    systems {
      id
      name
    }
    environments {
      id
      name
    }
  }
  ${RELEASE_FIELDS}
`;
