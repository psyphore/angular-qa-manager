import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class SecurityService {
  private baseUrl = environment.baseUrl;
  private baseUrl2 = environment.baseUrl2;
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get("${baseUrl}/users");
  }

  getProjects() {
    return this.http.get("${baseUrl}/albums");
  }
}
