import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get("${baseUrl}/users");
  }

  getUser(userId: number) {
    return this.http.get("${baseUrl}/users/${userId}");
  }
}
