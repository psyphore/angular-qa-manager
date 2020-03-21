import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignInCredentials, SignIn } from '@models/security.interface';
import { AuthService } from '@services/security.service';

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(private service$: AuthService, private router: Router) {}

  public SignIn(values: SignInCredentials): void {
    this.service$.signIn(values).subscribe(
      (payload: SignIn) => {
        this.service$.setAuthorizationHeader(payload.login.jwt);
        this.router.navigate(['security/me']);
      },
      err => console.error('X failed to auth', err)
    );
  }
}
