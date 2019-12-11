import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedMaterialModule } from './shared-material.module';
import { HeaderInterceptor } from './interceptors/auth.interceptor';
import { EmojiDirective } from './directives/emoji.directive';
import {
  ProjectsService,
  PersonService,
  PersonQuery,
  AuthService,
  BasicService,
  JiraService
} from './services';
import { AuthGuard } from './guards/auth.guard';

const COMPONENTS = [EmojiDirective];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, HttpClientModule, RouterModule, SharedMaterialModule],
  providers: [
    AuthService,
    AuthGuard,
    ProjectsService,
    PersonService,
    PersonQuery,
    BasicService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
      deps: [AuthService]
    }
    // JiraService
  ],
  exports: COMPONENTS
})
export class SharedModule {}
