import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Person,
  PeopleResponse,
  PersonResponse
} from '@models/person.interface';
import { GetPersonQuery, GetAllPeople } from '@graphql/person.queries';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<Person[]> {
    return this.apollo
      .query<PeopleResponse, null>({
        query: GetAllPeople
      })
      .pipe(map(res => res.data.people));
  }

  getUser(personId: number): Observable<Person> {
    return this.apollo
      .query<PersonResponse, any>({
        query: GetPersonQuery,
        variables: { userId: personId }
      })
      .pipe(map(res => res.data.person));
  }
}
