import gql from 'graphql-tag';

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

export const BasicQuery = gql`
  query allPosts {
    products {
      id
      name
      description
      champions {
        id
        firstname
        lastname
        title
        avatar
      }
    }
  }
`;
