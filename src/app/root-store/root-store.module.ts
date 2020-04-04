import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from '@environments/environment';
import { SignInStoreModule } from './sign-in-store/sign-in-store.module';
import { MeStoreModule } from './me-store/me-store.module';
import { ReleaseStoreModule } from './release-store/release-store.module';
import { OptionsStoreModule } from './options-store/options-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignInStoreModule,
    MeStoreModule,
    ReleaseStoreModule,
    OptionsStoreModule,

    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: environment.appName,
      disabled: environment.production
    })
  ]
})
export class RootStoreModule {}
