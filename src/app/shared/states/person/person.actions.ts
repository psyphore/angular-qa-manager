import { Action } from '@ngrx/store';
import { Pokemon } from '@models/pokemon';
import { PokemonActionTypes } from '@shared/enums/pokemon-action-types.enum';

export class LoadPokemon implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS;

  constructor() {}
}

export class LoadPokemonSuccess implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS_SUCCESS;

  constructor(public payload: Array<Pokemon>) {}
}
export class LoadPokemonFailed implements Action {
  readonly type = PokemonActionTypes.LOAD_POKEMONS_FAILED;

  constructor(public message: string) {}
}

export class Add implements Action {
  readonly type = PokemonActionTypes.ADD;

  constructor(public pokemon: Pokemon) {}
}

export class AddSuccess implements Action {
  readonly type = PokemonActionTypes.ADD_SUCCESS;

  constructor(public pokemon: Pokemon) {}
}
export class AddFailed implements Action {
  readonly type = PokemonActionTypes.ADD_FAILED;

  constructor(public message: string) {}
}

export class Delete implements Action {
  readonly type = PokemonActionTypes.DELETE;

  constructor(public id: number) {}
}
export class DeleteSuccess implements Action {
  readonly type = PokemonActionTypes.DELETE_SUCCESS;

  constructor(public id: number) {}
}
export class DeleteFailed implements Action {
  readonly type = PokemonActionTypes.DELETE_FAILED;

  constructor(public message: string) {}
}

export class Update implements Action {
  readonly type = PokemonActionTypes.UPDATE;

  constructor(public pokemon: Pokemon) {}
}
export class UpdateSuccess implements Action {
  readonly type = PokemonActionTypes.UPDATE_SUCCESS;

  constructor(public pokemon: Pokemon) {}
}
export class UpdateFailed implements Action {
  readonly type = PokemonActionTypes.UPDATE_FAILED;

  constructor(public message: string) {}
}

export type PokemonActions =
  | LoadPokemonSuccess
  | Add
  | AddSuccess
  | AddFailed
  | Delete
  | DeleteSuccess
  | DeleteFailed
  | Update
  | UpdateSuccess
  | UpdateFailed;
