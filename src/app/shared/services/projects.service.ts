import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Project,
  ProjectsResponse,
  ProjectResponse
} from '@models/project.interface';
import { GetProjects, GetProjectById } from '@shared/graphql';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private apollo: Apollo) {}

  public getProjects() {
    return this.http.get<Array<Project>>(`${this.baseUrl}/albums`);
  }

  public getProject(projectId: number) {
    return this.http.get<Project>(`${this.baseUrl}/albums/${projectId}`);
  }

  public add(project: Project) {
    return this.http.post<Project>(`${this.baseUrl}/albums`, project);
  }

  public delete(projectId: number) {
    return this.http.delete<Project>(`${this.baseUrl}/albums/${projectId}`);
  }

  public update(project: Project) {
    return this.http.put<Project>(`${this.baseUrl}/albums`, project);
  }

  public getAllProjectsGQL(
    limit: number,
    start: number
  ): Observable<ProjectsResponse> {
    return this.apollo
      .watchQuery<ProjectsResponse, any>({
        query: GetProjects,
        variables: { limit, start }
      })
      .valueChanges.pipe(map(result => result.data));
  }

  public getAProjectByIdGQL(projectId: number): Observable<ProjectResponse> {
    return this.apollo
      .watchQuery<ProjectResponse, any>({
        query: GetProjectById,
        variables: { releaseId: projectId }
      })
      .valueChanges.pipe(map(result => result.data));
  }
}
