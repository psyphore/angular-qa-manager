import gql from 'graphql-tag';
import { personFields } from './person.queries';
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
      ...basicIssueFields
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
