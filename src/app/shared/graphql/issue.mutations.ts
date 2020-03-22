import gql from 'graphql-tag';

export const AddIssue = gql`
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

export const UpdateIssue = gql`
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

export const DeleteIssue = gql`
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
