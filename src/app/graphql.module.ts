import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import { AuthService } from '@services/security.service';
import { environment } from '@environments/environment';

export function provideApollo(httpLink: HttpLink) {
  const uri = environment.graphQL_URI2;
  const auth = new AuthService();

  const http = httpLink.create({
    uri,
    useMultipart: true
  });

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
      ContentType: 'application/json',
      Authorization: auth.hasToken() ? auth.getAuthorizationHeader() : ''
    }
  }));

  const cache = new InMemoryCache();

  const link = from([basic, http]);

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
