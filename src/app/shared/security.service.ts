import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
  private baseUrl = "https://jsonplaceholder.typicode.com";
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get("${baseUrl}/users");
  }

  getProjects() {
    return this.http.get("${baseUrl}/albums");
  }
}
