import { PokemonState } from '@shared/states/pokemon';
import { ProjectState } from '@shared/states/project';

export interface AppStore {
  pokemon: PokemonState;
  project: ProjectState;
}
