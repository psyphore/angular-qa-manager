import gql from 'graphql-tag';

export const ISSUE_FIELDS = gql`
  fragment basicIssueFields on Story {
    id
    summary
    description
    points
    created
    type
  }
`;

export const GET_ISSUE_QUERY = gql`
  query getIssues($limit: Int, $start: Int) {
    Story (offset: $limit, first: $start ) {
      ...basicIssueFields
    }
  }
  ${ISSUE_FIELDS}
`;

export const GET_ISSUE_BY_ID_QUERY = gql`
  query getIssueById($issueId: String!) {
    Story(id: $issueId) {
      ...basicIssueFields
    }
  }
  ${ISSUE_FIELDS}
`;
