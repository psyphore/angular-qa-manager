import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService, StrapiAuthService } from '@shared/services';
import { SignInCredentials } from '@shared/interfaces/security.interface';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  public signInFormGroup: FormGroup;

  constructor(
    private service: StrapiAuthService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  public signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      const credentials: any = { ...this.signInFormGroup.value };
      const creds: SignInCredentials = {
        creds: {
          identifier: credentials.identifier,
          password: credentials.password,
          provider: 'local'
        }
      };
      console.log(creds);
      this.service.mutate(creds).subscribe(
        res => {
          const { jwt } = res.data.login;
          console.log(jwt);
          this.auth.addSessionItem('id_token', jwt);
        },
        err => {
          console.error(err);
          this.auth.addSessionItem('id_token', null);
        }
      );

      this.initializeForm();
    } catch (error) {
      console.log(error);
    }
  }

  initializeForm() {
    this.signInFormGroup = this.fb.group({
      identifier: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
}
