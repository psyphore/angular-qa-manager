import gql from 'graphql-tag';

export const SignIn = gql`
  mutation signIn($creds: UsersPermissionsLoginInput!) {
    login(input: $creds) {
      jwt
      user {
        id
        username
        email
        provider
        confirmed
        blocked
        role {
          name
        }
        person {
          lastname
          firstname
          title
          mobile
        }
      }
    }
  }
`;
