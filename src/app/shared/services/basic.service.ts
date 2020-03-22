import { EnumsResponse } from '@models/enums.interface';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GetAllEnums } from '@shared/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeneralServices {
  constructor(private apollo: Apollo) {}

  public getAllOptions(): Observable<EnumsResponse> {
    return this.apollo
      .watchQuery<EnumsResponse>({
        query: GetAllEnums
      })
      .valueChanges.pipe(map(res => res.data));
  }
}
