import gql from 'graphql-tag';

export const AddRelease = gql`
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

export const UpdateRelease = gql`
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

export const DeleteRelease = gql`
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
