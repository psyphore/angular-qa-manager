import { gql } from '@apollo/client/core';

export interface Post {
  id: string;
  title: string;
  votes: number;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface BasicQueryResponse {
  posts: Post[];
}

export const BASIC_QUERY = gql`
  query AllReleased {
  Release(first: 10) {
    id
    name
    description
    version
    storys(first: 5) {
      summary
      points
      type
    }
  }
}
`;

export const GET_ALL_ENUMS_QUERY = gql`
  query getOptions {
    # statuses {
    #   id
    #   name
    # }
    # systems {
    #   id
    #   name
    # }
    # environments {
    #   id
    #   name
    # }
    User {
      name
    }
  }
`;
