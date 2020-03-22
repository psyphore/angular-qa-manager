import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';

import { SignInCredentials } from '@models/security.interface';
import { SigningIn } from '@root-store/sign-in-store/actions';
import { SignInState } from '@root-store/sign-in-store/state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  signInFormGroup: FormGroup;

  @Select(SignInState.getToken) authenticated$;
  @Select(SignInState.getErrors) errorMessage$;
  @Select(SignInState.isLoading) isLoading$;

  constructor(private fb: FormBuilder, private store$: Store) {}

  ngOnInit() {
    this.initializeForm();
  }

  signIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    try {
      const values = <SignInCredentials>{
        creds: { ...this.signInFormGroup.value }
      };

      this.store$.dispatch(new SigningIn(values));
      this.initializeForm();
    } catch (error) {
      console.error(error);
    }
  }

  initializeForm() {
    this.signInFormGroup = this.fb.group({
      identifier: ['siphoh', Validators.required],
      password: ['.c2h7GX3UMQ@FuV', Validators.required],
      provider: ['local', Validators.required]
    });
  }
}
