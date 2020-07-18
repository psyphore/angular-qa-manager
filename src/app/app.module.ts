import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ViewsModule } from './views/views.module';
import { LayoutModule } from './views/layout/layout.module';
import { GraphQLModule } from './graphql.module';
import { RootStoreModule } from '@root-store/root-store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    RouterModule,

    SharedModule,
    ViewsModule,
    LayoutModule,
    AppRoutingModule,
    GraphQLModule,
    RootStoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
