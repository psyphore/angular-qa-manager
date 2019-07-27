import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '@shared/shared-material.module';
import { SharedModule } from '@shared/shared.module';

import { QaProjectModule } from './qa-project/qa-project.module';
import { PersonModule } from './person/person.module';
import { LayoutModule } from './layout/layout.module';

import { LoadingComponent } from './loading/loading.component';
import { LandingComponent } from './landing/landing.component';
import { CallbackComponent } from './callback/callback.component';

const COMPONENTS = [CallbackComponent, LandingComponent, LoadingComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    RouterModule,
    SharedMaterialModule,
    SharedModule,
    QaProjectModule,
    PersonModule,
    LayoutModule
  ],
  exports: COMPONENTS
})
export class ViewsModule {}
