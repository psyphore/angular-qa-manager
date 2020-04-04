import gql from 'graphql-tag';

/** Sign in
 * @example {
  "creds": {
    "identifier": "username email address",
    "password": "password"
  }
}
 */
export const SIGN_IN_MUTATION = gql`
  mutation signin($creds: UsersPermissionsLoginInput!) {
    login(input: $creds) {
      jwt
    }
  }
`;
