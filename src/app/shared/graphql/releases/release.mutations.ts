import { RELEASE_FIELDS } from './release.queries';
import { gql } from '@apollo/client/core';

export const ADD_RELEASE_MUTATION = gql`
  mutation addRelease(
    $created: Int!
    $description: String!
    $id: String!
    $name: String!
    $version: String!
  ) {
    CreateRelease(created: $created, description: $description, id: $id, name: $name, version: $version) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;

export const UPDATE_RELEASE_MUTATION = gql`
  mutation UpdateRelease($created: Int!) {
    UpdateRelease(created: $created) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;

export const DELETE_RELEASE_MUTATION = gql`
  mutation deleteRelease($created: Int!) {
    DeleteRelease(created: $created) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;
