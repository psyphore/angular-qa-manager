import gql from 'graphql-tag';

export const ADD_ISSUE_MUTATION = gql`
  mutation addIssue($issue: createIssueInput!) {
    createIssue(input: $issue) {
      issue {
        id
        created_at
        updated_at
      }
    }
  }
`;

export const UPDATE_ISSUE_MUTATION = gql`
  mutation updateIssue($issue: updateIssueInput!) {
    updateIssue(input: $issue) {
      issue {
        id
        created_at
        updated_at
      }
    }
  }
`;

export const DELETE_ISSUE_MUTATION = gql`
  mutation deleteIssue($issue: deleteIssueInput!) {
    deleteIssue(input: $issue) {
      issue {
        id
        created_at
        updated_at
      }
    }
  }
`;
