import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OptionsStoreEffects } from './effects';
import { featureReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('options', featureReducer),
    EffectsModule.forFeature([OptionsStoreEffects])
  ],
  providers: [OptionsStoreEffects]
})
export class OptionsStoreModule {}
