import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SignInStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('signIn', featureReducer),
    EffectsModule.forFeature([SignInStoreEffects])
  ],
  providers: [SignInStoreEffects]
})
export class SignInStoreModule {}
