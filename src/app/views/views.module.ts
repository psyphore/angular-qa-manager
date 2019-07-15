import { NgModule } from '@angular/core';
import { SharedMaterialModule } from '@shared/shared-material.module';
import { SharedModule } from '@shared/shared.module';

import { QaProjectModule } from './qa-project/qa-project.module';
import { PersonModule } from './person/person.module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { LandingComponent } from './landing/landing.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    CallbackComponent,
    LandingComponent,
    LoadingComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [QaProjectModule, PersonModule, SharedMaterialModule, SharedModule],
  exports: [
    CallbackComponent,
    LandingComponent,
    LoadingComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class ViewsModule {}
