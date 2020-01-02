import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Person,
  PeopleResponse,
  PersonResponse
} from '@models/person.interface';
import { GetProfileQuery, GetAllPeople } from '@graphql/person.queries';

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

  getUser(userId: number): Observable<Person> {
    console.log(userId);
    return this.apollo
      .query<PersonResponse, any>({
        query: GetProfileQuery,
        variables: { userId }
      })
      .pipe(map(res => res.data.person));
  }
}
