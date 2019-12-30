import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';
import { reducers } from '@states/root.reducer';
import { PokemonEffects } from '@states/pokemon';
import { ProjectEffects } from '@states/project';
import { PersonEffects } from '@states/person';
import { SecurityEffects } from '@states/security';
import {
  PersonService,
  ProjectsService,
  PokemonService,
  StrapiAuthService,
  AuthService
} from '@shared/services';

const effects = [
  PokemonEffects,
  ProjectEffects,
  PersonEffects,
  SecurityEffects
];
const services = [
  PersonService,
  ProjectsService,
  PokemonService,
  StrapiAuthService,
  AuthService
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([...effects])
  ],
  providers: [...services],
  exports: []
})
export class CoreModule {}
