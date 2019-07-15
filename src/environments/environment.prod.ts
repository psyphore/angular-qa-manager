export const environment = {
  appName: 'Cardinal Quality Manager',
  production: true,
  baseUrl: "https://jsonplaceholder.typicode.com",
  baseUrl2: "https://reqres.in/api/",
  baseGQL: "https://o5x5jzoo7z.sse.codesandbox.io/graphql",
  graphQL_URI1: "http://sipholpt:3081/graphql",
  graphQL_WS_URI: "ws://sipholpt:3081/graphql",
  graphQL_URI: "http://graphql.nodaljs.com/graph",
  // Auth0 application configuration
  auth0config: {
    domain: "isivumelwano.eu.auth0.com",
    client_id: "LoqTta1aYK4pMoHNv287evwQ1IHUEW4R",
    redirect_uri: `${window.location.origin}/callback`,
    leeway: 120000
  }
};
