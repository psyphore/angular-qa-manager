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
  AddIssue,
  DeleteIssue,
  GetIssueById,
  GetIssues,
  UpdateIssue
} from '@shared/graphql';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  constructor(private apollo: Apollo) {}

  public addIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: AddIssue,
        variables: { issue }
      })
      .pipe(map(({ data }) => data));
  }

  public deleteIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: DeleteIssue,
        variables: { issue }
      })
      .pipe(map(({ data }) => data));
  }

  public updateIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse>({
        mutation: UpdateIssue,
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
        query: GetIssues,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }

  public getIssueById(issueId: number): Observable<IssueResponse> {
    return this.apollo
      .watchQuery<IssueResponse>({
        query: GetIssueById,
        variables: { issueId }
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
