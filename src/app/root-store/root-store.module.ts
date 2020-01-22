import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

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

    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule {}
