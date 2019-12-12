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

export const GetAllEnums = gql`
  query getEnums {
    environments {
      id
      name
    }
    statuses {
      id
      name
    }
    systems {
      id
      name
    }
  }
`;

export const GetEnvironments = gql`
  query getEnvironmentEnums {
    environments {
      id
      name
    }
  }
`;

export const GetStatuses = gql`
  query getStatusEnums {
    statuses {
      id
      name
    }
  }
`;

export const GetSystems = gql`
  query getSystemEnums {
    systems {
      id
      name
    }
  }
`;
