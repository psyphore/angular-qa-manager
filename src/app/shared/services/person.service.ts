import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Person,
  PeopleResponse,
  PersonResponse
} from '@models/person.interface';
import { GET_PERSON_QUERY, GET_ALL_PEOPLE_QUERY } from '@graphql/person.queries';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private apollo: Apollo) { }

  getUsers(): Observable<Person[]> {
    return this.apollo
      .watchQuery<PeopleResponse>({
        query: GET_ALL_PEOPLE_QUERY
      })
      .valueChanges.pipe(map(({ data }) => data.people));
  }

  getUser(personId: number): Observable<Person> {
    return this.apollo
      .watchQuery<PersonResponse>({
        query: GET_PERSON_QUERY,
        variables: { userId: personId }
      })
      .valueChanges.pipe(map(({ data }) => data.person));
  }
}
