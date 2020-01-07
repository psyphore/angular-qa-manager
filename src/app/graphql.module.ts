import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { onError } from 'apollo-link-error';

import { environment } from '@environments/environment';

const uri = environment.graphQL_URI2;

export function provideApollo(httpLink: HttpLink) {
  const http = httpLink.create({
    uri,
    useMultipart: true,
    includeQuery: true,
    includeExtensions: true
  });

  const cache = new InMemoryCache();

  const error = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(x => {
        console.error(`> [GraphQL error]: `, x);
      });
    }
    if (networkError) {
      console.error(`> [Network error]: `, networkError);
    }
  });

  const link = from([error, http]);

  return {
    link,
    cache
  };
}

@NgModule({
  exports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
