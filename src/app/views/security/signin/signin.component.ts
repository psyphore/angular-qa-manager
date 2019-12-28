import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, StrapiAuthService } from '@services/security.service';
import { SignInCredentials } from '@models/security.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public signInFormGroup: FormGroup;
  public errorMessage: string = null;

  constructor(
    private service: StrapiAuthService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  public signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      this.errorMessage = null;
      const credentials: any = { ...this.signInFormGroup.value };
      const creds: SignInCredentials = {
        creds: {
          identifier: credentials.identifier,
          password: credentials.password,
          provider: 'local'
        }
      };

      this.service.signIn2(creds).subscribe(
        d => console.log(d),
        err => console.error(err),
        () => console.log('done')
      );

      // this.service.signIn(creds).subscribe(
      //   res => {
      //     if (res.login.jwt) {
      //       console.log(res.login.jwt);
      //       this.auth.addSessionItem('id_token', res.login.jwt);
      //       this.router.navigate(['security/me']);
      //     }
      //   },
      //   error => {
      //     console.error(error);
      //     this.errorMessage = error;
      //   }
      // );

      this.initializeForm();
    } catch (error) {
      console.error(error);
      this.errorMessage = error.message;
    }
  }

  initializeForm() {
    this.signInFormGroup = this.fb.group({
      identifier: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
}
