import gql from 'graphql-tag';
import { PERSON_FIELDS } from '../person.queries';

export const BASIC_USER_FIELDS = gql`
  fragment basicUserFields on Security {
    id
    created
    user {
      ...basicPersonFields
    }
    confirmed
    blocked
  }
  ${PERSON_FIELDS}
`;

export const GET_PROFILE_QUERY = gql`
  query getProfile {
    Security {
      ...basicUserFields
    }
  }
  ${BASIC_USER_FIELDS}
`;
