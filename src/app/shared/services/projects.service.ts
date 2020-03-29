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

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private apollo: Apollo) {}

  public addRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: AddRelease,
        variables: { release }
      })
      .pipe(map(({ data }) => data));
  }

  public deleteRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: DeleteRelease,
        variables: { release }
      })
      .pipe(map(({ data }) => data));
  }

  public updateRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: UpdateRelease,
        variables: { release }
      })
      .pipe(map(({ data }) => data));
  }

  public getAllReleases(
    limit: number,
    start: number
  ): Observable<ReleasesResponse> {
    return this.apollo
      .watchQuery<ReleasesResponse>({
        query: GetReleases,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getReleaseById(projectId: number): Observable<ReleaseResponse> {
    return this.apollo
      .watchQuery<ReleaseResponse>({
        query: GetReleaseById,
        variables: { releaseId: projectId }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getReleaseListing(limit: number, start: number): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: ProjectsPageQuery,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
