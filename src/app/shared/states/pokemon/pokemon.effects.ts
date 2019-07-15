import * as PokemonActions from '@states/pokemon/pokemon.actions';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Pokemon } from '@shared/interfaces/pokemon.interface';
import { PokemonService } from '@services/pokemon.service';
import { PokemonActionTypes } from '@shared/enums/pokemon-action-types.enum';

@Injectable()
export class PokemonEffects {
  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    public snackBar: MatSnackBar
  ) {}

  POKEMON_ACTIONS_SUCCESS = [
    PokemonActionTypes.ADD_SUCCESS,
    PokemonActionTypes.UPDATE_SUCCESS,
    PokemonActionTypes.DELETE_SUCCESS,
    PokemonActionTypes.LOAD_POKEMONS_SUCCESS
  ];

  POKEMON_ACTIONS_FAILED = [
    PokemonActionTypes.ADD_FAILED,
    PokemonActionTypes.UPDATE_FAILED,
    PokemonActionTypes.DELETE_FAILED,
    PokemonActionTypes.LOAD_POKEMONS_FAILED
  ];

  @Effect()
  loadAllPokemon$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActionTypes.LOAD_POKEMONS),
    switchMap(() =>
      this.pokemonService.getAll().pipe(
        map(response => new PokemonActions.LoadPokemonSuccess(response)),
        catchError(error => of(new PokemonActions.LoadPokemonFailed(error)))
      )
    )
  );

  @Effect()
  addPokemon$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActionTypes.ADD),
    switchMap((action: any) =>
      this.pokemonService.add(action.pokemon).pipe(
        map((pokemon: Pokemon) => new PokemonActions.AddSuccess(pokemon)),
        catchError(error => of(new PokemonActions.AddFailed(error)))
      )
    )
  );

  @Effect()
  deletePokemon$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActionTypes.DELETE),
    switchMap(({ id }) =>
      this.pokemonService.delete(id).pipe(
        map(() => new PokemonActions.DeleteSuccess(id)),
        catchError(error => of(new PokemonActions.DeleteFailed(error)))
      )
    )
  );

  @Effect()
  updatePokemon$: Observable<any> = this.actions$.pipe(
    ofType(PokemonActionTypes.UPDATE),
    switchMap(({ pokemon }) =>
      this.pokemonService.update(pokemon).pipe(
        map(() => new PokemonActions.UpdateSuccess(pokemon)),
        catchError(error => of(new PokemonActions.UpdateFailed(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  successNotification$ = this.actions$.pipe(
    ofType(...this.POKEMON_ACTIONS_SUCCESS),
    tap(() =>
      this.snackBar.open('SUCCESS', 'Operation success', {
        duration: 2000
      })
    )
  );
  @Effect({ dispatch: false })
  failedNotification$ = this.actions$.pipe(
    ofType(...this.POKEMON_ACTIONS_FAILED),
    tap(() =>
      this.snackBar.open('FAILED', 'Operation failed', {
        duration: 2000
      })
    )
  );
}
