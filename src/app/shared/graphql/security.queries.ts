import gql from 'graphql-tag';
import { personFields } from './person.queries';

export const userFields = gql`
  fragment basicUserFields on UsersPermissionsMe {
    id
    username
    email
    confirmed
    blocked
    role {
      name
    }
  }

  ${personFields}
`;

export const GetProfileQuery = gql`
  query getProfile {
    me {
      ...basicUserFields
    }
  }
  ${userFields}
`;
