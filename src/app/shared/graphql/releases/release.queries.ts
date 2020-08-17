import { gql } from '@apollo/client/core';

export const RELEASE_FIELDS = gql`
  fragment basicReleaseFields on Release {
    id
    name
    version
    created
  }
`;

export const GET_RELEASE_QUERY = gql`
  query getReleases($limit: Int, $start: Int) {
    Release(offset: $limit, first: $start) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;

export const GET_RELEASE_BY_ID_QUERY = gql`
  query getProjectById($releaseId: String!) {
    Release(id: $releaseId) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;

export const GET_PROJECTS_PAGE_QUERY = gql`
  query projectListing($limit: Int = 10, $start: Int = 0) {
    Release(offset: $limit, first: $start) {
      ...basicReleaseFields
    }
  }
  ${RELEASE_FIELDS}
`;
