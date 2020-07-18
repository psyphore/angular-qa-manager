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
  GET_RELEASE_QUERY,
  GET_RELEASE_BY_ID_QUERY,
  ADD_RELEASE_MUTATION,
  DELETE_RELEASE_MUTATION,
  UPDATE_RELEASE_MUTATION,
  GET_PROJECTS_PAGE_QUERY
} from '@shared/graphql';
import { IssueUpdateResponse, Issue, IssueResponse, IssuesResponse } from '@shared/interfaces/issue.interface';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private apollo: Apollo) { }

  public addRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: ADD_RELEASE_MUTATION,
        variables: { release }
      })
      .pipe(map(({ data }) => data));
  }

  public deleteRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: DELETE_RELEASE_MUTATION,
        variables: { release }
      })
      .pipe(map(({ data }) => data));
  }

  public updateRelease(release: Release): Observable<ReleaseUpdateResponse> {
    return this.apollo
      .mutate<ReleaseUpdateResponse>({
        mutation: UPDATE_RELEASE_MUTATION,
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
