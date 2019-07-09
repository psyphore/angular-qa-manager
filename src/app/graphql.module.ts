import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from './../environments/environment';
import { AuthService } from './shared/security.service';
import { ApolloLink } from 'apollo-link';
// import { ApolloLink } from "apollo-link";

const uri = environment.graphQL_URI1; // <-- add the URL of the GraphQL server here
const auth = new AuthService();

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: new HttpHeaders().set(
      'Authorization',
      auth.getAuthorizationHeader() || null
    )
  });
  return forward(operation);
});

export function createApollo(httpLink: HttpLink) {
  const hl = httpLink
    .create({
      uri,
      includeExtensions: true,
      useMultipart: true
    })
    .concat(authMiddleware);

  return {
    link: hl,
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
