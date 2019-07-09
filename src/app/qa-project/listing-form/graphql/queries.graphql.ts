import gql from 'graphql-tag';
import { Project, Story } from '../../project.type';

export const GetProjects = gql`
  query getAllProjects {
    products {
      id
      name
      description
    }
  }
`;

export const GetProjectById = gql`
  query getProjectById {
    product {
      id
      name
      description
    }
  }
`;

export interface ProjectsResponse {
  projects: [Project];
}

export interface ProjectResponse {
  project: Project;
}
