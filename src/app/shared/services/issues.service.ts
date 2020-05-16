import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
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
  private _issue = new BehaviorSubject<IssueUpdateResponse>(null);

  constructor(private apollo: Apollo) { }

  public addIssue(issue: Issue): Observable<IssueUpdateResponse> {
    this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: ADD_ISSUE_MUTATION,
        variables: { issue },
        update: (proxy, { data }) => {
          this._issue.next(data);
        }
      }).subscribe();

    return this._issue.asObservable();
  }

  public deleteIssue(issueId: number): Observable<IssueUpdateResponse> {
    this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: DELETE_ISSUE_MUTATION,
        variables: { issueId },
        update: (proxy, { data }) => {
          this._issue.next(data);
        }
      }).subscribe();

    return this._issue.asObservable();
  }

  public updateIssue(issue: Issue): Observable<IssueUpdateResponse> {
    this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: UPDATE_ISSUE_MUTATION,
        variables: { issue },
        update: (proxy, { data }) => {
          this._issue.next(data);
        }
      }).subscribe();

    return this._issue.asObservable();
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
