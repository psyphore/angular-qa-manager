import { Observable } from "rxjs";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "../shared/security.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated) {
      return true;
    }

    // navigate to login page
    this._router.navigate(["/login"]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
