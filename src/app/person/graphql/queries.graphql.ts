import gql from 'graphql-tag';
import { Person } from '../person.type';

export const GetProfileQuery = gql`
  query person {
    me {
      ...basicFields
    }
  }

  fragment basicFields on Person {
    id
    title
    firstname
    lastname
    email
    mobile
    avatar
    knownAs
    bio
    subscriptions
    manager {
      id
      firstname
      lastname
    }
    team {
      id
      firstname
      lastname
    }
  }
`;

export interface ProfileResponse {
  profile: Person;
}
