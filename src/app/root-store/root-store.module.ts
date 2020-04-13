import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule, StorageOption } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { environment } from '@environments/environment';
import { SignInStoreModule } from './sign-in-store/sign-in-store.module';
import { MeStoreModule } from './me-store/me-store.module';
import { ReleaseStoreModule } from './release-store/release-store.module';
import { OptionsStoreModule } from './options-store/options-store.module';
import { PeopleStoreModule } from './people-store/people-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SignInStoreModule,
    MeStoreModule,
    ReleaseStoreModule,
    OptionsStoreModule,
    PeopleStoreModule,

    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      storage: StorageOption.SessionStorage,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: environment.appName,
      disabled: environment.production
    })
  ]
})
export class RootStoreModule { }
