export const environment = {
  production: true,
  baseUrl: "https://jsonplaceholder.typicode.com",
  baseUrl2: "https://reqres.in/api/",
  baseGQL: "https://o5x5jzoo7z.sse.codesandbox.io/graphql",
  graphQL_URI: "http://sipholpt:3081/graphql",
  graphQL_SUBSCRIPTIONS_URI: "ws://sipholpt:3081/graphql",
  // Auth0 application configuration
  auth0config: {
    domain: "isivumelwano",
    client_id: "b86Cd_cnOqBA4ti9wk3HPqOmplKkkRQz",
    redirect_uri: `${window.location.origin}/callback`
  }
};
