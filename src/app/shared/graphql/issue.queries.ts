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

export const GetIssues = gql`
  query getIssues($limit: Int, $start: Int) {
    issues(limit: $limit, start: $start) {
      ...basicReleaseFields
    }
  }

  ${IssueFields}
`;

export const GetIssueById = gql`
  query getIssueById($issueId: ID!) {
    issue(id: $issueId) {
      id
      summary
      person {
        ...basicPersonFields
      }
    }
  }

  ${personFields}
`;
