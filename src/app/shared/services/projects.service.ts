import { Project, ProjectResponse } from './../interfaces/project.interface';
import { GetProjects, GetProjectById } from './../graphql/project.queries';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from 'apollo-angular';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseUrl = environment.baseUrl;
  constructor(public http: HttpClient) {}

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
}

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceGQL extends Query<ProjectResponse> {
  document = GetProjects;
}
