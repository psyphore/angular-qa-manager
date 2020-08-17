import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache';
import { from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

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
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule { }
