import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { SignInState } from '@root-store/sign-in-store/state';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  @Select(SignInState.isAuthenticated) isAuthenticated$: Observable<boolean>;
  constructor(private router: Router) { }

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
    return this.isAuthenticated$.pipe(
      tap(value => {
        if (value === true) {
          return true;
        }
        this.router.navigate(['/security/signin']);
        return false;
      })
    );
  }
}
