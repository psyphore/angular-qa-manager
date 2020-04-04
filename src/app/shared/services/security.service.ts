import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { SIGN_IN_MUTATION, GET_PROFILE_QUERY } from '@shared/graphql';
import {
  SignIn as SignInResponse,
  Me as MeResponse,
  SignInCredentials
} from '@models/security.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: any; // Auth0Client;

  constructor(private apollo: Apollo) { }

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<any> {
    if (!this.auth0Client) {
      // this.auth0Client = await createAuth0Client(environment.auth0config);

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

  async fetchAuth0Client(): Promise<any> {
    if (!this.auth0Client) {
      this.profile.next(await this.auth0Client.getUser());
    }
    return this.auth0Client;
  }

  logout() {
    this.auth0Client.logout();
    this.removeSessionItem('access_token');
    this.removeSessionItem('id_token');
    this.removeSessionItem('expires_at');
  }

  setAuthorizationHeader(value): void {
    this.addSessionItem('id_token', value);
  }

  getAuthorizationHeader(): string {
    const token = this.getSession('id_token');
    const authHeader = token ? `Bearer ${token}` : '';
    return authHeader;
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

  addSessionItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  removeSessionItem(key: string): void {
    localStorage.removeItem(key);
  }

  getSession(key: string): any {
    return localStorage.getItem(key);
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

  public signIn(credentials: SignInCredentials): Observable<SignInResponse> {
    return this.apollo
      .mutate<SignInResponse>({
        mutation: SIGN_IN_MUTATION,
        variables: { creds: credentials.creds }
      })
      .pipe(map(({ data }) => data));
  }

  public me(): Observable<MeResponse> {
    return this.apollo
      .watchQuery<MeResponse>({
        query: GET_PROFILE_QUERY
      })
      .valueChanges.pipe(map(({ data }) => data));
  }
}
