import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  IssuesResponse,
  IssueResponse,
  IssueUpdateResponse,
  Issue
} from '@models/issue.interface';
import {
  ADD_ISSUE_MUTATION,
  DELETE_ISSUE_MUTATION,
  GET_ISSUE_BY_ID_QUERY,
  GET_ISSUE_QUERY,
  UPDATE_ISSUE_MUTATION
} from '@shared/graphql';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  constructor(private apollo: Apollo) { }

  public addIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: ADD_ISSUE_MUTATION,
        variables: { issue }
      })
      .pipe(map(({ data }) => data));
  }

  public deleteIssue(issueId: number): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: DELETE_ISSUE_MUTATION,
        variables: { issueId }
      })
      .pipe(map(({ data }) => data));
  }

  public updateIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: UPDATE_ISSUE_MUTATION,
        variables: { issue }
      })
      .pipe(map(({ data }) => data));
  }

  public getAllIssues(
    limit: number,
    start: number
  ): Observable<IssuesResponse> {
    return this.apollo
      .watchQuery<IssuesResponse>({
        query: GET_ISSUE_QUERY,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getIssueById(issueId: number): Observable<IssueResponse> {
    return this.apollo
      .watchQuery<IssueResponse>({
        query: GET_ISSUE_BY_ID_QUERY,
        variables: { issueId }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
