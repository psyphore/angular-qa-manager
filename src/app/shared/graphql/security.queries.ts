import gql from 'graphql-tag';

export const basicUserFields = gql`
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

export const GetProfileQuery = gql`
  query getProfile {
    me {
      ...basicUserFields
    }
  }
  ${basicUserFields}
`;
