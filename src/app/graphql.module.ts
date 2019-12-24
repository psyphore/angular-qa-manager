import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AuthService } from './shared/services/security.service';
import { ApolloLink } from 'apollo-link';
import { environment } from '@environments/environment';

const uri = environment.graphQL_URI2; // <-- add the URL of the GraphQL server here
const auth = new AuthService();


export function createApollo(httpLink: HttpLink, apollo: ApolloLink) {
const http = httpLink.create({
  uri,
  useMultipart: true
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: new HttpHeaders().set(
      'Authorization',
      auth.getAuthorizationHeader() || null
    )
  });
  return forward(operation);
});

  apollo.create({
    link: concat(authMiddleware, http),
    cache: new InMemoryCache()
  });

  return apollo;

  // return {
  //   link: concat(authMiddleware, http),
  //   cache: new InMemoryCache()
  // };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ApolloLink]
    }
  ]
})
export class GraphQLModule {}
