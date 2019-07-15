import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokemonEffects } from '@states/pokemon/pokemon.effects';
import { PokemonService } from '@services/pokemon.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@shared/states/root.reducer';
import { environment } from '@environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProjectsService } from '@shared/services/projects.service';
import { ProjectEffects } from '@shared/states/project';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([PokemonEffects, ProjectEffects])
  ],
  providers: [PokemonService, ProjectsService],
  exports: []
})
export class CoreModule {}
