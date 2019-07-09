import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { AuthService } from './security.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.authService.hasToken()) {
      return true;
    }

    const client = await this.authService.getAuth0Client();
    const isAuthenticated = await client.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    client.loginWithRedirect({
      redirect_uri: environment.auth0config.redirect_uri,
      appState: { target: state.url }
    });

    return false;
  }
}
