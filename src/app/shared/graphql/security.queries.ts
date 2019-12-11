import gql from 'graphql-tag';

export const userFields = gql`
  fragment basicUserFields on UsersPermissionsMe {
    iid
    username
    email
    confirmed
    blocked
    role {
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
  ${userFields}
`;
