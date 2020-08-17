import { gql } from '@apollo/client/core';
import { ISSUE_FIELDS } from './issue.queries';

export const ADD_ISSUE_MUTATION = gql`
  mutation addIssue(
    $created: Int!
    $description: String!
    $id: String!
    $points: Int!
    $summary: String!
    $type: String!
  ) {
    CreateStory(created: $created, description: $description, id: $id, points: $points, summary: $summary, type: $type) {
      ...basicIssueFields
    }
  }
  ${ISSUE_FIELDS}
`;

export const UPDATE_ISSUE_MUTATION = gql`
  mutation updateIssue(
    $created: Int!
    $description: String!
    $id: String!
    $points: Int!
    $summary: String!
    $type: String!
  ) {
    UpdateStory(created: $created, description: $description, id: $id, points: $points, summary: $summary, type: $type) {
      ...basicIssueFields
    }
  }
  ${ISSUE_FIELDS}
`;

export const DELETE_ISSUE_MUTATION = gql`
  mutation deleteIssue($created: Int!) {
    DeleteStory(created: $created) {
      ...basicIssueFields
    }
  }
  ${ISSUE_FIELDS}
`;
