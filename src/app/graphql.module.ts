import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo } from 'apollo-angular';
import { ApolloLink, concat } from 'apollo-link';

import { AuthService } from '@services/security.service';
import { environment } from '@environments/environment';

const uri = environment.graphQL_URI2; // <-- add the URL of the GraphQL server here
const auth = new AuthService();


export function createApollo(httpLink: HttpLink, apollo: Apollo) {
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

const cache = new InMemoryCache();

  apollo.create({
    link: concat(authMiddleware, http),
    cache
  });

  return apollo;
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Apollo]
    }
  ]
})
export class GraphQLModule {}
