import gql from 'graphql-tag';

export const PROJECT_FIELDS = gql`
  fragment basicProjectFields on Project {
    id
    name
    description
  }
`;

export const GET_PROJECTS = gql`
  query getProjects {
    Project {
      ...basicProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;

export const GET_PROJECT = gql`
  query getProject($id: String!) {
    Project(id: $id) {
      ...basicProjectFields
    }
  }
  ${PROJECT_FIELDS}
`;
