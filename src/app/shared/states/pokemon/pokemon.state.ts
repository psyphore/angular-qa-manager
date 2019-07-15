import { Pokemon } from '@shared/interfaces/pokemon';
export interface PokemonState {
  ids: number[];
  entities: { [key: string]: Pokemon };
}
