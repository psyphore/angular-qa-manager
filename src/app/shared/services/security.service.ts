import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client(environment.auth0config);

      // Provide the current value of isAuthenticated
      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

      // Whenever isAuthenticated changes, provide the current value of `getUser`
      this.isAuthenticated.subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          const user = await this.auth0Client.getUser();
          this.profile.next(user);
          this.setSessionToken();
          return;
        }

        this.profile.next(null);
      });
    }

    return this.auth0Client;
  }

  async fetchAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.profile.next(await this.auth0Client.getUser());
    }
    return this.auth0Client;
  }

  getAuthorizationHeader(): string {
    const token = this.getSession('id_token');
    const authHeader = token ? `Bearer ${token}` : null;
    return authHeader;
  }

  logout() {
    this.auth0Client.logout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setSessionToken() {
    const cached = this.auth0Client['cache'].cache[
      'default::openid profile email'
    ];
    if (cached) {
      this.setSession({
        accessToken: cached.access_token,
        idToken: cached.id_token,
        expiresIn: cached.expires_in
      });
    }
    return localStorage.getItem('id_token');
  }

  hasToken(): boolean {
    const hasHeader = this.getAuthorizationHeader() !== null;
    return hasHeader;
  }

  addSessionItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    this.addSessionItem('access_token', authResult.accessToken);
    this.addSessionItem('id_token', authResult.idToken);
    this.addSessionItem('expires_at', expiresAt);
  }

  getSession(key: string): any {
    return localStorage.getItem(key);
  }
}
