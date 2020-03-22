import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MeStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('me', featureReducer),
    EffectsModule.forFeature([MeStoreEffects])
  ],
  providers: [MeStoreEffects]
})
export class MeStoreModule {}
