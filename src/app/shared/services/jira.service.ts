import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as JIRA from '@atlassian/jira'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  private jira: JIRA;

  constructor(private http: HttpClient) {
    jira: JIRA = new JIRA({
      baseUrl: environment.jira.baseUrl.replace('#token#', environment.jira.token),
      headers: {},
      options: {
        timeout: 10
      }
    });

    this.jira.authenticate({
      type: 'token',
      token: environment.jira.token
    });

   }
}
