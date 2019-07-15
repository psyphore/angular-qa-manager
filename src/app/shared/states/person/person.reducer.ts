import { PersonActionTypes, PersonActions } from './person.actions';

import { PersonState } from './person.state';

export function pokemonInitialState(): PersonState {
  return {
    ids: [],
    entities: {}
  };
}

function arrayToObject(array) {
  return array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
  }, {});
}

export function pokemonReducer(
  state: PokemonState = pokemonInitialState(),
  action: PokemonActions
): PokemonState {
  switch (action.type) {
    case PokemonActionTypes.LOAD_POKEMONS_SUCCESS:
      return {
        ...state,
        entities: arrayToObject(action.payload)
      };

    case PokemonActionTypes.ADD_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.pokemon.id]: action.pokemon
        }
      };

    case PokemonActionTypes.DELETE_SUCCESS:
      const entities = { ...state.entities };
      delete entities[action.id];
      return {
        ...state,
        entities
      };

    case PokemonActionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.pokemon.id]: action.pokemon
        }
      };

    default:
      return state;
  }
}
