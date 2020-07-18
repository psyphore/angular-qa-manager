import gql from 'graphql-tag';

export const BASIC_USER_FIELDS = gql`
  fragment basicUserFields on UsersPermissionsMe {
    id
    username
    email
    confirmed
    blocked
    role {
      id
      name
    }
  }
`;

export const GET_PROFILE_QUERY = gql`
  query getProfile {
    me {
      ...basicUserFields
    }
  }
  ${BASIC_USER_FIELDS}
`;
