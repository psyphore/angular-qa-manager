import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/plaform-browser/animations";
import { NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing/landing.component";
import { QaProjectModule } from "./qa-project/qa-project.module";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, LandingComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ApolloModule,
    FormsModule,
    HttpLinkModule,

    SharedModule,
    AppRoutingModule,
    QaProjectModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: "https://o5x5jzoo7z.sse.codesandbox.io/graphql"
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
