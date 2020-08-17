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
  mutation signin($username: String!, $password: String!) {
    Security(username: $username, password: $password) {
      jwt
    }
  }
`;
