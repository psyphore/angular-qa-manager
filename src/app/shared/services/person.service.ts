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
      .watchQuery<PeopleResponse>({
        query: GetAllPeople
      })
      .valueChanges.pipe(map(({ data }) => data.people));
  }

  getUser(personId: number): Observable<Person> {
    return this.apollo
      .watchQuery<PersonResponse>({
        query: GetPersonQuery,
        variables: { userId: personId }
      })
      .valueChanges.pipe(map(({ data }) => data.person));
  }
}
