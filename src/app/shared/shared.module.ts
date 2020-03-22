import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedMaterialModule } from './shared-material.module';
import { HeaderInterceptor } from './interceptors/auth.interceptor';

import { EmojiDirective } from './directives';
import {} from './pipes';
import {
  ProjectsService,
  PersonService,
  AuthService,
  IssuesService,
  GeneralServices
} from './services';
import { AuthGuard } from './guards';

const COMPONENTS = [EmojiDirective];
const SERVICES = [
  AuthService,
  AuthGuard,
  ProjectsService,
  PersonService,
  IssuesService,
  GeneralServices,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true,
    deps: [AuthService]
  }
];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, HttpClientModule, RouterModule, SharedMaterialModule],
  providers: SERVICES,
  exports: COMPONENTS
})
export class SharedModule {}
