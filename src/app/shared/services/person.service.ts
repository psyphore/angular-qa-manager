import { Query } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Person } from '@models/person';
import { GetProfileQuery } from '@shared/graphql/person.queries';

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
