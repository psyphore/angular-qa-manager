import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Apollo } from 'apollo-angular';

import {
  RootStoreState,
  SignInStoreActions,
  SignInStoreSelectors
} from '../../root-store';

// import {
//   selectEntities,
//   selectAuthToken
// } from '@states/security/security.selector';
// import { AppStore } from '@models/store.interface';
import { SignIn, GetProfileQuery } from '@shared/graphql';
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

  constructor(private store$: Store<RootStoreState.RootState>, private apollo: Apollo) {}

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

  getAuthorizationHeader(): string {
    const token = this.getSession('id_token');
    const authHeader = token ? `Bearer ${token}` : '';
    return authHeader;
  }

  getAuthorizationHeaderAsync(): Observable<string> {
    const header = this.store$.pipe(select(SignInStoreSelectors.selectMyFeatureUser)).pipe(
      map(res => {
        if (!res || res === undefined || Object.entries(res).length === 0) {
          return '';
        }
        const token = res; // res.undefined.login.jwt ? res.undefined.login.jwt : '';
        return token.length !== 0 ? `Bearer ${token}` : token;
      })
    );

    return header;
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
    const hasHeader = this.getAuthorizationHeader();
    return hasHeader && hasHeader.indexOf('Bearer ') !== -1;
  }

  hasTokenAsync(): Observable<boolean> {
    return this.getAuthorizationHeaderAsync().pipe(
      map(header => header && header.indexOf('Bearer ') !== -1)
    );
  }

  addSessionItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  removeSessionItem(key: string): void {
    localStorage.removeItem(key);
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

  public signIn(credentials: SignInCredentials): Observable<SignInResponse> {
    return this.apollo
      .mutate<SignInResponse, SignInCredentials>({
        mutation: SignIn,
        variables: { creds: credentials.creds }
      })
      .pipe(map(result => result.data));
  }

  public me(): Observable<MeResponse> {
    return this.apollo
      .watchQuery<null, MeResponse>({
        query: GetProfileQuery
      })
      .valueChanges.pipe(map(result => result.data));
  }
}
