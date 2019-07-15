import * as PokemonActions from '@states/pokemon/pokemon.actions';
import * as PokemonSelectors from '@states/pokemon/pokemon.selector';
import { AppStore } from '@models/store.interface';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Project } from '@models/project.type';
import { Pokemon } from '@models/pokemon';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  public pokemon: Pokemon = {} as Pokemon;
  public project: Project = {} as Project;

  public projects$: Observable<any> = this.store$.select(
    PokemonSelectors.selectAll
  );

  public onDelete(pokemon: Pokemon) {
    this.store$.dispatch(new PokemonActions.Delete(pokemon.id));
  }
  public onSelect(pokemon: Pokemon) {
    this.pokemon = pokemon;
  }

  public onUpdate(pokemon: Pokemon) {
    this.store$.dispatch(new PokemonActions.Update(pokemon));
  }
  public onAdd(pokemon: Pokemon) {
    this.store$.dispatch(new PokemonActions.Add(pokemon));
  }

  constructor(private store$: Store<AppStore>) {
    this.store$.dispatch(new PokemonActions.LoadPokemon());
  }
}
