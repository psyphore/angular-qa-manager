import gql from 'graphql-tag';

export const ADD_RELEASE_MUTATION = gql`
  mutation addRelease($release: createReleaseInput!) {
    createRelease(input: $release) {
      release {
        id
        created_at
        updated_at
      }
    }
  }
`;

export const UPDATE_RELEASE_MUTATION = gql`
  mutation UpdateRelease($release: updateReleaseInput!) {
    updateRelease(input: $release) {
      release {
        id
        created_at
        updated_at
      }
    }
  }
`;

export const DELETE_RELEASE_MUTATION = gql`
  mutation deleteRelease($release: deleteReleaseInput!) {
    deleteRelease(input: $release) {
      release {
        id
        created_at
        updated_at
      }
    }
  }
`;
