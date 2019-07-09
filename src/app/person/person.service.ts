import { Query, Apollo } from 'apollo-angular';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GetProfileQuery } from './graphql/queries.graphql';
import { Person } from './person.type';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUser(userId: number) {
    return this.http.get(`${this.baseUrl}/users/${userId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PersonQuery extends Query<Person> {
  document = GetProfileQuery;
}
