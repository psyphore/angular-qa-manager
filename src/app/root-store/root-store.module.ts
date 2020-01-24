import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

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

    EffectsModule.forRoot([]),
    StoreModule.forRoot(
      {},
      {
        metaReducers: [storageSyncMetaReducer],
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true
        }
      }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    })
  ]
})
export class RootStoreModule {}
