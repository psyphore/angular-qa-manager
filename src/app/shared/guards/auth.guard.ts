import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { SignInStoreState } from '@root-store/sign-in-store';
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
  constructor(private router: Router, private store$: Store) {}

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
    const hasToken =
      this.store$.selectSnapshot(SignInStoreState.SignInState.getToken) !==
      null;

    return new Observable<boolean>(s => s.next(hasToken)).pipe(
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
