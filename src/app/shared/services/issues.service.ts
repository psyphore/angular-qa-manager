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
      .mutate<IssueUpdateResponse, any>({
        mutation: AddIssue,
        variables: { issue }
      })
      .pipe(map(result => result.data));
  }

  public deleteIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse, any>({
        mutation: DeleteIssue,
        variables: { issue }
      })
      .pipe(map(result => result.data));
  }

  public updateIssue(issue: Issue): Observable<IssueUpdateResponse> {
    return this.apollo
      .mutate<IssueUpdateResponse, any>({
        mutation: UpdateIssue,
        variables: { issue }
      })
      .pipe(map(result => result.data));
  }

  public getAllIssues(
    limit: number,
    start: number
  ): Observable<IssuesResponse> {
    return this.apollo
      .watchQuery<IssuesResponse, any>({
        query: GetIssues,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(result => result.data));
  }

  public getIssueById(issueId: number): Observable<IssueResponse> {
    return this.apollo
      .watchQuery<IssueResponse, any>({
        query: GetIssueById,
        variables: { issueId }
      })
      .valueChanges.pipe(map(result => result.data));
  }
}
