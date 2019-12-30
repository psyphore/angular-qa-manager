import { PokemonState } from '@states/pokemon';
import { ProjectState } from '@states/project';
import { PersonState } from '@states/person';
import { SecurityState } from '@states/security';

export interface AppStore {
  pokemon: PokemonState;
  project: ProjectState;
  person: PersonState;
  security: SecurityState;
}
