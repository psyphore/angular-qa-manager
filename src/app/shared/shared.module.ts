import { SharedMaterialModule } from './shared-material.module';
import { HeaderInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AuthService } from './services/security.service';
import { EmojiDirective } from './directives/emoji.directive';
import { ProjectsService } from './services/projects.service';
import { PersonService, PersonQuery } from './services/person.service';
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
      deps: [AuthService]
    }
  ],
  exports: COMPONENTS
})
export class SharedModule {}
