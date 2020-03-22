# Quality Assurance Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Steps to update angular

```sh
npm install @angular/cli@latest
git add -A && git commit -m "chore: add latest angular cli"
ng update @angular/cli
git add -A && git commit -m "chore: update angular cli"
ng update @angular/core
git add -A && git commit -m "chore: update angular core"
npm install --save @angular/animations@latest @angular/cdk@latest @angular/common@latest @angular/compiler@latest @angular/core@latest @angular/flex-layout@latest @angular/forms@latest @angular/http@latest @angular/material@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/router@latest core-js@latest zone.js@latest rxjs@latest rxjs-compat@latest
npm install --save-dev @angular-devkit/build-angular@latest @angular/compiler-cli@latest @angular/language-service @types/jasmine@latest @types/node@latest codelyzer@latest karma@latest karma-chrome-launcher@latest karma-cli@latest karma-jasmine@latest karma-jasmine-html-reporter@latest jasmine-core@latest jasmine-spec-reporter@latest protractor@latest tslint@latest rxjs-tslint@latest webpack@latest
ng serve
```

## Resources

1. [freeCodeCamp.org](https://youtu.be/GbivbPy00FU)
1. [Upgrade from Angular 5.2 to 8.0](https://update.angular.io/#5.2:8.0)
1. [Upgrade guide that actually worked](https://dzone.com/articles/upgrade-to-angular-7-in-5-simple-steps-1)
1. [angular-apollo-graphql](https://g00glen00b.be/apollo-graphql-angular/)
1. [apollographql-angular-docs](https://www.apollographql.com/docs/angular/)
1. [auth0-angular-sample](https://github.com/auth0-samples/auth0-angular-samples/tree/master/01-Login/src/app)
1. [angular-architecture-best-practices](https://angular-academy.com/angular-architecture-best-practices/)

## Environment

```javascript
export const environment = {
  appName: 'Quality Manager',
  production: false,
  baseUrl: 'https://jsonplaceholder.typicode.com',
  baseUrl2: 'https://reqres.in/api/',
  baseGQL: 'https://o5x5jzoo7z.sse.codesandbox.io/graphql',
  graphQL_URI1: 'http://sipholpt:3081/graphql',
  graphQL_URI2: 'http://localhost:1337/graphql',
  // graphQL_WS_URI: 'ws://sipholpt:3081/graphql',
  graphQL_URI: 'http://graphql.nodaljs.com/graph',
  // Auth0 application configuration
  auth0config: {
    domain: 'domain',
    client_id: 'cliendId',
    redirect_uri: `${window.location.origin}/callback`,
    leeway: 120000
  },
  jira: {
    token: 'token',
    baseUrl: 'https://api.atlassian.com/ex/jira/#cloudId#/rest/'
  }
};
```
