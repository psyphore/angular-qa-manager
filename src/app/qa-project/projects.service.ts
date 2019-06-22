import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ProjectsService {
  constructor(public http: HttpClient) {}

  getProjects() {
    this.http.get("https://api.coinmarketcap.com/v1/ticker");
  }
}
