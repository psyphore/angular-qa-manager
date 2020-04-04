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

export const BASIC_QUERY = gql`
  query allPosts {
    releases {
      id
      projectName
      releaseName
      issues {
        summary
        description
        points
      }
    }
  }
`;

export const GET_ALL_ENUMS_QUERY = gql`
  query getOptions {
    statuses {
      id
      name
    }
    systems {
      id
      name
    }
    environments {
      id
      name
    }
  }
`;

export const GET_ENVIRONMENTS_QUERY = gql`
  query getEnvironmentEnums {
    environments {
      id
      name
    }
  }
`;

export const GET_STATUSES_QUERY = gql`
  query getStatusEnums {
    statuses {
      id
      name
    }
  }
`;

export const GET_SYSTEMS_QUERY = gql`
  query getSystemEnums {
    systems {
      id
      name
    }
  }
`;
