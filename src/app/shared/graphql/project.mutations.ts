import { personFields } from './person.queries';
import gql from 'graphql-tag';

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
  }
`;

export const GetProjects = gql`
  query getAllProjects {
    releases {
      ...basicReleaseFields
    }
  }
  ${ReleaseFields}
`;

export const GetProjectById = gql`
  query getProjectById {
    release(id: "X") {
      id
      projectName
      releaseName
      person {
        ...basicPersonFields
      }
    }
  }

  ${personFields}
`;
