import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';

import { BasicQuery, BasicQueryResponse } from './basic.graphql';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends Query<BasicQueryResponse> {
  document = BasicQuery;
}
