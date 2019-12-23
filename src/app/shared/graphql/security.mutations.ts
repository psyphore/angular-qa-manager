import gql from 'graphql-tag';

/** Sign in
 * @example {
  "creds": {
    "identifier": "username email address",
    "password": "password"
  }
}
 */
export const SignIn = gql`
  mutation signin($creds: UsersPermissionsLoginInput!) {
    login(input: $creds) {
      jwt
    }
  }
`;
