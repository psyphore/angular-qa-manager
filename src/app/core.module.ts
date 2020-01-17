import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

import { environment } from '@environments/environment';
import { reducers } from '@states/root.reducer';
import { ProjectEffects } from '@states/project';
import { IssueEffects } from '@states/issue';
import { EnumsEffects } from '@states/enums';
import { PersonEffects } from '@states/person';
import { SecurityEffects } from '@states/security';
import { MeEffects } from '@states/me';

const effects = [
  ProjectEffects,
  PersonEffects,
  SecurityEffects,
  MeEffects,
  IssueEffects,
  EnumsEffects
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [storageSyncMetaReducer]
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true,
      //   strictStateSerializability: true,
      //   strictActionSerializability: true
      // }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      features: {
        pause: false,
        lock: true,
        persist: true
      }
    }),
    EffectsModule.forRoot(effects)
  ]
})
export class CoreModule {}
