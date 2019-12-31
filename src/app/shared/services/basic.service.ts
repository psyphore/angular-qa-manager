import { EnumsReponse } from './../interfaces/enums.interface';
import { Injectable } from '@angular/core';
import { Query, Apollo } from 'apollo-angular';
import { BasicQueryResponse, BasicQuery, GetAllEnums } from '@shared/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicService extends Query<BasicQueryResponse> {
  document = BasicQuery;
}

@Injectable({ providedIn: 'root' })
export class GeneralServices {
  constructor(private apollo: Apollo) {}

  public getAllOptions(): Observable<EnumsReponse> {
    return this.apollo
      .query<EnumsReponse>({
        query: GetAllEnums
      })
      .pipe(map(res => res.data));
  }
}
