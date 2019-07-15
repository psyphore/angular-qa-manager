import { Query } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Person } from '@models/person.interface';
import { GetProfileQuery } from '@shared/graphql/person.queries';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<Array<Person>>(`${this.baseUrl}/users`);
  }

  getUser(userId: number) {
    return this.http.get<Person>(`${this.baseUrl}/users/${userId}`);
  }

  addUser(person: Person) {
    return this.http.post<Person>(`${this.baseUrl}/users`, person);
  }

  updateUser(person: Person) {
    return this.http.put<Person>(`${this.baseUrl}/users/${person.id}`, person);
  }

  deleteUser(personId: number) {
    return this.http.delete<Person>(`${this.baseUrl}/users/${personId}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PersonQuery extends Query<Person> {
  document = GetProfileQuery;
}
