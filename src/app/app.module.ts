import { PersonModule } from './person/person.module';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { AppComponent } from './app.component';
import { QaProjectModule } from './qa-project/qa-project.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,

    SharedModule,
    AppRoutingModule,
    QaProjectModule,
    PersonModule,
    GraphQLModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
