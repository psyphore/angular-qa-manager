// import { EnumsResponse } from '@models/enums.interface';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_ENUMS_QUERY } from '@shared/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeneralServices {
  constructor(private apollo: Apollo) { }

  public getAllOptions(): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: GET_ALL_ENUMS_QUERY
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
