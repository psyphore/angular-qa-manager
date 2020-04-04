import gql from 'graphql-tag';

export const AVATAR_FIELDS = gql`
  fragment basicAvatarFields on UploadFile {
    sha256
    url
    mime
    ext
  }
`;

export const PERSON_FIELDS = gql`
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

  ${AVATAR_FIELDS}
`;

export const GET_PERSON_QUERY = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      ...basicPersonFields
    }
  }

  ${PERSON_FIELDS}
`;

export const GET_ALL_PEOPLE_QUERY = gql`
  query getPeeps {
    people {
      ...basicPersonFields
      avatar {
        url
      }
    }
  }
  ${PERSON_FIELDS}
`;
