import { pokemonReducer } from './pokemon';
import { projectReducer } from './project';
import { personReducer } from './person';

export const reducers = {
  pokemon: pokemonReducer,
  project: projectReducer,
  person: personReducer
};
