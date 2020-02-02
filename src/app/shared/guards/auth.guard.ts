import { AuthService } from '@services/security.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkForToken();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(next, state);
  }

  checkForToken(): Observable<boolean> {
    return new Observable<boolean>(s => s.next(this.auth.hasToken())).pipe(
      map(value => {
        if (value === true) {
          return true;
        }
        this.router.navigate(['/security/signin']);
        return false;
      })
    );
  }

  checkForTokenAsync(): Observable<boolean> {
    return this.auth.hasTokenAsync().pipe(
      map(value => {
        if (value === true) {
          return true;
        }
        this.router.navigate(['/security/signin']);
        return false;
      })
    );
  }
}
