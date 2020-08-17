import { gql } from '@apollo/client/core';

export const PERSON_FIELDS = gql`
  fragment basicPersonFields on User {
    id
    name
    email
  }
`;

export const GET_PERSON_QUERY = gql`
  query getPerson($id: String!) {
    User(id: $id) {
      ...basicPersonFields
    }
  }

  ${PERSON_FIELDS}
`;

export const GET_ALL_PEOPLE_QUERY = gql`
  query getPeeps {
    User {
      ...basicPersonFields
    }
  }
  ${PERSON_FIELDS}
`;
