import gql from 'graphql-tag';

export const avatarFields = gql`
  fragment basicAvatarFields on UploadFile {
    sha256
    url
    mime
    ext
  }
`;

export const personFields = gql`
  fragment basicPersonFields on Person {
    id
    title
    firstname
    lastname
    email
    mobile
    avatar {
      ...basicAvatarFields
    }
    knownAs
    bio
  }

  ${avatarFields}
`;

export const GetProfileQuery = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      ...basicPersonFields
    }
  }

  ${personFields}
`;

export const GetAllPeople = gql`
  query getPeeps {
    people {
      id
      firstname
      lastname
      avatar {
        url
      }
    }
  }
`;
