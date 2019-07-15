import gql from 'graphql-tag';
import { Project } from '@models/project.interface';

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
