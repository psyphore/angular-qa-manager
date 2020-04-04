import gql from 'graphql-tag';
import { PERSON_FIELDS } from './person.queries';

export const ISSUE_FIELDS = gql`
  fragment basicIssueFields on Issue {
    id
    summary
    description
    points
    person {
      ...basicPersonFields
    }
  }

  ${PERSON_FIELDS}
`;

export const GET_ISSUE_QUERY = gql`
  query getIssues($limit: Int, $start: Int) {
    issues(limit: $limit, start: $start) {
      ...basicIssueFields
    }
  }

  ${ISSUE_FIELDS}
`;

export const GET_ISSUE_BY_ID_QUERY = gql`
  query getIssueById($issueId: ID!) {
    issue(id: $issueId) {
      id
      summary
      person {
        ...basicPersonFields
      }
    }
  }

  ${PERSON_FIELDS}
`;
