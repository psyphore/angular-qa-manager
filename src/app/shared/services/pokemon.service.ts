import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '@shared/interfaces/pokemon.interface';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(environment.baseUrl);
  }

  public delete(id: string): Observable<Pokemon> {
    return this.http.delete<Pokemon>(`${environment.baseUrl}/${id}`);
  }

  public add(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.post<Pokemon>(environment.baseUrl, pokemon);
  }

  public update(pokemon: Partial<Pokemon>): Observable<Pokemon> {
    return this.http.put<Pokemon>(`${environment.baseUrl}`, pokemon);
  }
}
