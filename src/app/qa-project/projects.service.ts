import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  baseUrl = "https://jsonplaceholder.typicode.com";
  constructor(public http: HttpClient) {}

  getUser() {
    return this.http.get("${baseUrl}/users");
  }

  getProjects() {
    return this.http.get("${baseUrl}/albums");
  }

  getProjectDetails(taskId: number) {
    return this.http.get("${baseUrl}/albums/${taskId}");
  }
}
