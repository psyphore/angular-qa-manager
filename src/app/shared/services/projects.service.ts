import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  ReleasesResponse,
  ReleaseResponse,
  ReleaseUpdateResponse,
  Release,
  MutateRelease
} from '@models/release.interface';
import {
  GET_RELEASE_QUERY,
  GET_RELEASE_BY_ID_QUERY,
  ADD_RELEASE_MUTATION,
  DELETE_RELEASE_MUTATION,
  UPDATE_RELEASE_MUTATION,
  GET_PROJECTS_PAGE_QUERY
} from '@shared/graphql';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private _release = new BehaviorSubject<ReleaseUpdateResponse>(null);
  constructor(private apollo: Apollo) { }

  public addRelease(release: MutateRelease) {
    this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: ADD_RELEASE_MUTATION,
        variables: { release },
        update: (proxy, { data }) => {
          this._release.next(data);
        }
      }).subscribe();

    return this._release.asObservable();
  }

  public deleteRelease(release: MutateRelease): Observable<ReleaseUpdateResponse> {
    this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: DELETE_RELEASE_MUTATION,
        variables: { release },
        update: (proxy, { data }) => {
          this._release.next(data);
        }
      }).subscribe();

    return this._release.asObservable();
  }

  public updateRelease(release: Release): Observable<ReleaseUpdateResponse> {
    this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: UPDATE_RELEASE_MUTATION,
        variables: { release },
        update: (proxy, { data }) => {
          this._release.next(data);
        }
      }).subscribe();

    return this._release.asObservable();
  }

  public getAllReleases(
    limit: number,
    start: number
  ): Observable<ReleasesResponse> {
    return this.apollo
      .watchQuery<ReleasesResponse>({
        query: GET_RELEASE_QUERY,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getReleaseById(projectId: number): Observable<ReleaseResponse> {
    return this.apollo
      .watchQuery<ReleaseResponse>({
        query: GET_RELEASE_BY_ID_QUERY,
        variables: { releaseId: projectId }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getReleaseListing(limit: number, start: number): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: GET_PROJECTS_PAGE_QUERY,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
