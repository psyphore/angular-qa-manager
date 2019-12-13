import gql from 'graphql-tag';
import { userFields } from './security.queries';

/** Sign in
 * @example {
  "creds": {
    "identifier": "username email address",
    "password": "password"
  }
}
 */
export const SignIn = gql`
  mutation signIn($creds: UsersPermissionsLoginInput!) {
    login(input: $creds) {
      jwt
    }
  }
  ${userFields}
`;
