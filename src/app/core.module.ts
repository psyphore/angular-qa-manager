import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxCacheModule, NgrxCache } from 'apollo-angular-cache-ngrx';
import { storageSyncMetaReducer } from 'ngrx-store-persist';

import { environment } from '@environments/environment';
import { reducers } from '@states/root.reducer';
import { ProjectEffects } from '@states/project';
import { PersonEffects } from '@states/person';
import { SecurityEffects } from '@states/security';
// import { PersonService, ProjectsService, AuthService } from '@shared/services';

const effects = [ProjectEffects, PersonEffects, SecurityEffects];
// const services = [PersonService, ProjectsService, AuthService];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers: [storageSyncMetaReducer],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true
      }
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
    EffectsModule.forRoot([...effects]),
    NgrxCacheModule
  ],
  // providers: [...services],
  exports: []
})
export class CoreModule {
  constructor(_cache: NgrxCache) {
    const cache = _cache.create({});
  }
}
