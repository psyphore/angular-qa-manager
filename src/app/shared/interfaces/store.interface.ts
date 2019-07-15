import { PokemonState } from '@shared/states/pokemon';
import { ProjectState } from '@shared/states/project';
import { PersonState } from '@shared/states/person';

export interface AppStore {
  pokemon: PokemonState;
  project: ProjectState;
  person: PersonState;
}
