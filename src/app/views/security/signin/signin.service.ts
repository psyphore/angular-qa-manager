import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignInCredentials, SignIn } from '@shared/interfaces/security.interface';
import { AuthService } from '@shared/services/security.service';

@Injectable({ providedIn: 'root' })
export class SignInService {
  constructor(private service$: AuthService, private router: Router) { }

  public SignIn(values: SignInCredentials): void {
    this.service$.signIn(values).subscribe(
      ({ data }) => {
        this.service$.setAuthorizationHeader(data.login.jwt);
        this.router.navigate(['security/me']);
      },
      err => console.error('X failed to auth', err)
    );
  }
}
