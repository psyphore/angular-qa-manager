import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  ReleasesResponse,
  ReleaseResponse,
  ReleaseUpdateResponse,
  Release
} from '@models/release.interface';
import {
  GetReleases,
  GetReleaseById,
  AddRelease,
  DeleteRelease,
  UpdateRelease,
  ProjectsPageQuery
} from '@shared/graphql';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = environment.baseUrl;
  constructor(private apollo: Apollo) {}

  public addRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse, any>({
        mutation: AddRelease,
        variables: { release }
      })
      .pipe(map(result => result.data));
  }

  public deleteRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse, any>({
        mutation: DeleteRelease,
        variables: { release }
      })
      .pipe(map(result => result.data));
  }

  public updateRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse, any>({
        mutation: UpdateRelease,
        variables: { release }
      })
      .pipe(map(result => result.data));
  }

  public getAllReleases(
    limit: number,
    start: number
  ): Observable<ReleasesResponse> {
    return this.apollo
      .watchQuery<ReleasesResponse, any>({
        query: GetReleases,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(result => result.data));
  }

  public getReleaseById(projectId: number): Observable<ReleaseResponse> {
    return this.apollo
      .watchQuery<ReleaseResponse, any>({
        query: GetReleaseById,
        variables: { releaseId: projectId }
      })
      .valueChanges.pipe(map(result => result.data));
  }

  public getReleaseListing(limit: number, start: number): Observable<any> {
    return this.apollo
      .watchQuery<any, any>({
        query: ProjectsPageQuery,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(result => result.data));
  }
}
