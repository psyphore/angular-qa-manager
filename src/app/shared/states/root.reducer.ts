import { pokemonReducer } from './pokemon';
import { projectReducer } from './project';
import { personReducer } from './person';
import { securityReducer } from './security';

export const reducers = {
  pokemon: pokemonReducer,
  project: projectReducer,
  person: personReducer,
  security: securityReducer
};
