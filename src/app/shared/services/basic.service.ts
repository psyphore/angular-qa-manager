import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { BasicQueryResponse, BasicQuery } from '../graphql';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends Query<BasicQueryResponse> {
  document = BasicQuery;
}
