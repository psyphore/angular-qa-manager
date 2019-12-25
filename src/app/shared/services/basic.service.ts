import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { BasicQueryResponse, BasicQuery } from '@shared/graphql';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends Query<BasicQueryResponse> {
  document = BasicQuery;
}
