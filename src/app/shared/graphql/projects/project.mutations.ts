import gql from 'graphql-tag';
import { PROJECT_FIELDS } from './project.queries';

export const CREATE_PROJECT = gql`
mutation addProject(
  $created: Int!
$description: String!
$id: String!
$name: String!
) {
  CreateProject(created: $created, description: $description, id: $id, name: $name) {
    ...basicProjectFields
  }
}
${PROJECT_FIELDS}
`;

export const UPDATE_PROJECT = gql`
mutation updateProject(
  $created: Int!
$description: String!
$id: String!
$name: String!
){
  UpdateProject(created: $created, description: $description, id: $id, name: $name) {
    ...basicProjectFields
  }
}
${PROJECT_FIELDS}
`;

export const DELETE_PROJECT = gql`
mutation deleteProject(
  $created: Int!
){
  DeleteProject(created: $created) {
    ...basicProjectFields
  }
}
${PROJECT_FIELDS}
`;
